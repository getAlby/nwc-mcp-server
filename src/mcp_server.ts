import { nwc } from "@getalby/sdk";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetInfoTool } from "./tools/get_info.js";
import { registerGetWalletServiceInfoTool } from "./tools/get_wallet_service_info.js";
import { registerLookupInvoiceTool } from "./tools/lookup_invoice.js";
import { registerMakeInvoiceTool } from "./tools/make_invoice.js";
import { registerPayInvoiceTool } from "./tools/pay_invoice.js";
import { registerGetBalanceTool } from "./tools/get_balance.js";

export function createMCPServer(client: nwc.NWCClient): McpServer {
  const server = new McpServer(
    {
      name: "nwc-mcp-server",
      version: "1.2.0",
    },
    {}
  );

  registerGetWalletServiceInfoTool(server, client);
  registerGetInfoTool(server, client);
  registerMakeInvoiceTool(server, client);
  registerPayInvoiceTool(server, client);
  registerGetBalanceTool(server, client);
  registerLookupInvoiceTool(server, client);
  return server;
}
