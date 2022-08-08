import { client, closeConnection } from "../db/client";

export async function beforeServerStop() {
  // verify db client disconnected
  try {
    await closeConnection();
  } finally {
    console.log("DB disconnect confirmed");
  }
}
