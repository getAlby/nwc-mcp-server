# NWC MCP Server

Connect a bitcoin lightning wallet to your LLM using Nostr Wallet Connect ([NWC](https://nwc.dev/) or [NIP-47](https://github.com/nostr-protocol/nips/blob/master/47.md)).

This MCP server uses the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Quick Start

### Add to Claude Desktop

Add this to your claude_desktop_config.json:

```json
{
  "mcpServers": {
    "nwc": {
      "command": "npx",
      "args": ["-y", "@getalby/nwc-mcp-server"],
      "env": {
        "NWC_CONNECTION_STRING": "YOUR NWC CONNECTION STRING HERE"
      }
    }
  }
}
```

### Add to Goose

1. Type `goose configure`
2. Add extension -> Command Line Extension
3. Call it `nwc`
4. What command should be run: `npx -y @getalby/nwc-mcp-server`
5. Timeout: 30
6. Description: no
7. environment variables: yes
8. environment variable name: `NWC_CONNECTION_STRING`
9. environment variable value: `nostr+walletconnect://...` (your NWC connection secret here)

### Add to Cline

> Copy the below and paste it into a cline prompt. It should prompt you to update the connection string.

```json
Add the following to my MCP servers list:

"nwc": {
  "command": "npx",
  "args": ["-y", "@getalby/nwc-mcp-server"],
  "env": {
    "NWC_CONNECTION_STRING": "nostr+walletconnect://..."
  },
  "disabled": false,
  "autoApprove": []
}
```

## From Source

### Prerequisites

- Node.js 20+
- Yarn
- A connection string from a lightning wallet that supports NWC

### Installation

```bash
yarn install
```

### Building

```bash
yarn build
```

### Add your NWC connection

Copy `.env.example` to `.env` and update your connection string

### Inspect the tools (use/test without an LLM)

`yarn inspect`

### Supported Tools

See the [tools directory](./src/tools)
