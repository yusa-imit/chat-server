import { client, closeConnection } from "../db/client";

export async function beforeServerStop() {
  // verify db client disconnected
  await closeConnection();
}
