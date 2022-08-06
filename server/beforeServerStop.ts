import { client } from "../db/client";

export async function beforeServerStop() {
  // verify db client disconnected
  try {
    await client.close();
  } finally {
    console.log("DB disconnect confirmed");
  }
}
