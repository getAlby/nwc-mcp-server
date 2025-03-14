#!/usr/bin/env node
import "websocket-polyfill";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { nwc } from "@getalby/sdk";

import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetInfoTool } from "./tools/get_info.js";
import { registerMakeInvoiceTool } from "./tools/make_invoice.js";
import { registerPayInvoiceTool } from "./tools/pay_invoice.js";
import { registerGetBalanceTool } from "./tools/get_balance.js";
import { registerGetWalletServiceInfoTool } from "./tools/get_wallet_service_info.js";
import { registerLookupInvoiceTool } from "./tools/lookup_invoice.js";

// Load environment variables from .env file
dotenv.config();

// NWC connection string should be provided as an environment variable
const NWC_CONNECTION_STRING = process.env.NWC_CONNECTION_STRING;
if (!NWC_CONNECTION_STRING) {
  throw new Error("NWC_CONNECTION_STRING environment variable is required");
}

class NWCServer {
  private _server: McpServer;
  private _client: nwc.NWCClient;

  constructor() {
    this._server = new McpServer(
      {
        name: "nwc-mcp-server",
        version: "1.0.0",
      },
      {}
    );

    try {
      this._client = new nwc.NWCClient({
        nostrWalletConnectUrl: NWC_CONNECTION_STRING,
      });
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to connect to NWC wallet: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    registerGetWalletServiceInfoTool(this._server, this._client);
    registerGetInfoTool(this._server, this._client);
    registerMakeInvoiceTool(this._server, this._client);
    registerPayInvoiceTool(this._server, this._client);
    registerGetBalanceTool(this._server, this._client);
    registerLookupInvoiceTool(this._server, this._client);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this._server.connect(transport);
  }
}

new NWCServer().run().catch(console.error);
