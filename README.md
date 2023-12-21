# Quekz Snapshot

[![Create a holder snapshot](https://github.com/QuekzDev/snapshot/actions/workflows/create_snapshot.yaml/badge.svg)](https://github.com/QuekzDev/snapshot/actions/workflows/create_snapshot.yaml)

## About

This repository is used to create a snapshot of the Quekz holders daily

Utilizing GitHub Actions, the snapshot is created daily at 00:00 UTC and is stored in the `snapshot.csv` file.

## Config

Environment variables are used to configure the snapshot. These are:

- `API_KEY` - The Helius API key.
- `ONCHAIN_COLLECTION` - The onchain collection address to use for the snapshot. For example [BuAYoZPVwQw4AfeEpHTx6iGPbQtB27W7tJUjgyLzgiko](https://solscan.io/token/BuAYoZPVwQw4AfeEpHTx6iGPbQtB27W7tJUjgyLzgiko)
- `IGNORED_ADDRESSES` - A comma separated list of addresses to ignore.

## Usage

To use the snapshot, simply download the `snapshot.csv` file and import it into your application.

The snapshot is formatted as follows:
`address,count`

## Links

Looking for an RPC Provider? Check out [Helius](https://www.helius.dev/)

[![Twitter Follow](https://img.shields.io/twitter/follow/Quekz_?style=social)](https://twitter.com/Quekz_)
