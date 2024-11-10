function randomID() {
  return Math.random().toString(36).substring(2, 15);
}

async function getAssetsByAuthority(
  apiKey,
  authorityAddress,
  page = 1,
  limit = 1000
) {
  const url = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;

  const payload = {
    jsonrpc: "2.0",
    id: randomID(),
    method: "getAssetsByAuthority",
    params: {
      authorityAddress: authorityAddress,
      page,
      limit,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch assets from helius. Status: ${response.status}`
    );
  }

  const json = await response.json();
  return json;
}

async function run() {
  const HELIUS_API_KEY = process.env.API_KEY;
  const AUTHORITY_ADDRESS = process.env.AUTHORITY_ADDRESS;

  const hasAllRequiredEnvVars = [HELIUS_API_KEY, AUTHORITY_ADDRESS].every(
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

    assets.push(...items);

    if (response.result.total < limit) {
      break;
    }

    page++;
  }

  const hashes = assets.map((asset) => asset.id);

  const outputPath = "./hashlist.json";

  await Bun.write(outputPath, JSON.stringify(hashes), { encoding: "utf-8" });

  console.log(
    `Hashes generated. Saved to ${outputPath} | Found ${assets.length} mints`
  );
}

run();
