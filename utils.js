import { randomUUIDv7 } from "bun";

export async function getAssetsByGroup(
  apiKey,
  collection,
  page = 1,
  limit = 1000
) {
  const url = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;

  const payload = {
    jsonrpc: "2.0",
    id: randomUUIDv7(),
    method: "getAssetsByGroup",
    params: {
      groupKey: "collection",
      groupValue: collection,
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

export async function getAssetsByAuthority(
  apiKey,
  authorityAddress,
  page = 1,
  limit = 1000
) {
  const url = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;

  const payload = {
    jsonrpc: "2.0",
    id: randomUUIDv7(),
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
