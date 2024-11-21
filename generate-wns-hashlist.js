import { getAssetsByAuthority } from "./utils.js";

async function run() {
  const HELIUS_API_KEY = process.env.API_KEY;
  const AUTHORITY_ADDRESS = process.env.AUTHORITY_ADDRESS;
  const OUTPUT_PATH = process.env.OUTPUT_PATH || "./hashlist.json";

  const hasAllRequiredEnvVars = [HELIUS_API_KEY, AUTHORITY_ADDRESS].every(
    (variable) => variable !== "" && variable != undefined
  );

  if (!hasAllRequiredEnvVars) {
    throw new Error(
      "Missing required environment variables. Please check your .env file."
    );
  }

  const hashlist = [];
  let page = 1;
  let limit = 1000;

  while (true) {
    const response = await getAssetsByAuthority(
      HELIUS_API_KEY,
      AUTHORITY_ADDRESS,
      page,
      limit
    );

    const items = response.result?.items;

    if (!items) {
      throw new Error("Failed to fetch assets from helius.");
    }

    const hashes = items.map((item) => item.id);
    hashlist.push(...hashes);

    if (response.result.total < limit) {
      break;
    }

    page++;
  }

  await Bun.write(OUTPUT_PATH, JSON.stringify(hashlist), { encoding: "utf-8" });

  console.log(
    `Hashes generated. Saved to ${OUTPUT_PATH} | Found ${hashlist.length} hashes`
  );
}

run();
