import { client, closeConnection } from "../db/client";
import { despawnCluster } from "../db/util/chatHistory/ChatHistoryCluster";

export async function beforeServerStop() {
  // close child processes
  despawnCluster();
  // verify db client disconnected
  await closeConnection();
}
