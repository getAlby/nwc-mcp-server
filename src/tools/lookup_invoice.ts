import { nwc } from "@getalby/sdk";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerLookupInvoiceTool(
  server: McpServer,
  client: nwc.NWCClient
) {
  server.tool(
    "lookup_invoice",
    "Look up lightning invoice details from a BOLT-11 invoice or payment hash",
    {
      payment_hash: z
        .string()
        .describe("The payment hash of the invoice to look up")
        .optional(),
      invoice: z.string().describe("The BOLT 11 invoice to look up").optional(),
    },
    async (params) => {
      const result = await client.lookupInvoice(params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}
