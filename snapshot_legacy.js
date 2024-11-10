import { getAssetsByGroup } from "./utils.js";

async function run() {
  const HELIUS_API_KEY = process.env.API_KEY;
  const ONCHAIN_COLLECTION = process.env.ONCHAIN_COLLECTION;
  const IGNORED_ADDRESSES = process.env.IGNORED_ADDRESSES?.split(",") || [];

  const hasAllRequiredEnvVars = [HELIUS_API_KEY, ONCHAIN_COLLECTION].every(
    (variable) => variable !== "" && variable != undefined
  );

  if (!hasAllRequiredEnvVars) {
    throw new Error(
      "Missing required environment variables. Please check your .env file."
    );
  }

  const assets = [];
  let page = 1;
  let limit = 1000;

  while (true) {
    const response = await getAssetsByGroup(
      HELIUS_API_KEY,
      ONCHAIN_COLLECTION,
      page,
      limit
    );

    const items = response.result?.items;

    if (!items) {
      throw new Error("Failed to fetch assets from helius.");
    }

    assets.push(...items);

    if (response.result.total < limit) {
      break;
    }

    page++;
  }

  const holders = new Map();

  for (const asset of assets) {
    const { ownership } = asset;
    const { owner } = ownership;

    if (IGNORED_ADDRESSES.includes(owner)) {
      continue;
    }

    if (!holders.has(owner)) {
      holders.set(owner, 1);
      continue;
    }

    holders.set(owner, holders.get(owner) + 1);
  }

  const sortedHolders = [...holders.entries()].sort((a, b) => b[1] - a[1]);

  const csvHeader = "address,count\n";
  const csvRows = sortedHolders.map((holder) => holder.join(","));

  const csv = csvHeader + csvRows.join("\n");

  await Bun.write("snapshot_legacy.csv", csv, { encoding: "utf-8" });

  console.log("Snapshot generated.");
}

run();
