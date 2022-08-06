import { client } from "../db/client";

export async function beforeServerStop() {
  // verify db client disconnected
  await client.close();
}
