import { nwc } from "@getalby/sdk";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPayInvoiceTool(
  server: McpServer,
  client: nwc.NWCClient
) {
  server.tool(
    "pay_invoice",
    "Pay a lightning invoice",
    {
      invoice: z.string().describe("The lightning invoice to pay"),
      amount: z
        .number()
        .describe("Optional amount in millisats to pay a zero-amount invoice")
        .optional(),
      metadata: z
        .object({})
        .passthrough()
        .describe("Optional metadata to include with the payment")
        .optional(),
    },
    async (params) => {
      const result = await client.payInvoice(params);
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
