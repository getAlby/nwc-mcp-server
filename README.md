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

### Add to N8N (Community Node)

Currently this MCP server only works via command line (STDIO).

You can install the [n8n-nodes-mcp](https://github.com/nerding-io/n8n-nodes-mcp) community node and run n8n with tools enabled e.g.

```bash
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true npx n8n
```

Create a blank workflow and add an AI agent node. Configure your LLM model and add a new tool "MCP Client" (which will have a cube next to it showing it's a community node).

Configure the MCP Client by adding a credential with Command Line (STDIO) selected.

command: `npx`
arguments: `-y @getalby/nwc-mcp-server`
environments `NWC_CONNECTION_STRING=nostr+walletconnect://your_key_here` (create the whole line in a text editor and paste it in, since the password field cannot be switched to plaintext)

See the [N8N paid chat workflow](examples/n8n-paid-chat) for a full example

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
