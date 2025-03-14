# NWC MCP Server

Connect a bitcoin lightning wallet to your LLM using Nostr Wallet Connect ([NWC](https://nwc.dev/) or [NIP-47](https://github.com/nostr-protocol/nips/blob/master/47.md)).

This MCP server uses the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Prerequisites

- Node.js 20+
- Yarn
- A connection string from a lightning wallet that supports NWC

## Installation

```bash
yarn install
```

## Building

```bash
yarn build
```

## Add your NWC connection

Copy `.env.example` to `.env` and update your connection string

## Inspect the tools (use/test without an LLM)

`yarn inspect`

## Supported Tools

See the [tools directory](./src/tools)
