import cluster from "cluster";
import { ChatHistoryClusterIPC } from "../../../type/ChatHistoryClusterIPC";
import { ChatHistoryClusterIPCMessage } from "../../../constants/ChatHistoryClusterIPC";
import { ChatHistoryManager } from "./ChatHistoryManager";
import { ChatHistoryClusterIPCProcessor } from "../../../constants/ChatHistoryClusterIPC";
import { Chat } from "../../../type/Chat";
import { insertChatHistory } from "./insertChatHistory";

/**
 * Spawn child process of pushing chat history into db.
 */
export function spawnCluster() {
  if (cluster.isPrimary) {
    const secondary = cluster.fork();
    secondary.on("message", (worker, message: ChatHistoryClusterIPC) => {
      switch (message.type) {
        case ChatHistoryClusterIPCMessage.awake:
          worker.send({
            type: ChatHistoryClusterIPCMessage.process,
            content: ChatHistoryManager.getHistory(),
            from: ChatHistoryClusterIPCProcessor.primary,
          });
          ChatHistoryManager.flush();
          break;
        default:
          break;
      }
    });
    // Logging
    cluster.on("online", (worker) => {
      console.log("Worker spawned with pid : " + worker.process.pid);
    });
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker exit event occured : {
        worker: ${worker.process},
        code: ${code},
        signal: ${signal},
      }`);
      if (code === 200) {
        console.log("auto restart cluster");
        cluster.fork();
      }
    });
  }
  if (cluster.isWorker) {
    process.on("message", async (message: ChatHistoryClusterIPC) => {
      switch (message.type) {
        case ChatHistoryClusterIPCMessage.process:
          for (const room of Object.keys(
            message.content as { [key: string]: Chat[] }
          )) {
            await insertChatHistory(room, message.content[room]);
          }
          break;
        case ChatHistoryClusterIPCMessage.exit:
          process.exit(1);
        default:
          break;
      }
    });
    setTimeout(() => {
      if (!process.send) {
        throw new Error(
          "There's any parent process to communicate. Check the process."
        );
      }
      process.send({
        type: ChatHistoryClusterIPCMessage.awake,
        content: "",
        from: ChatHistoryClusterIPCProcessor.secondary,
      });
    }, 300000);
  }
}

// Force despawn
export function despawnCluster() {
  for (const id in cluster.workers) {
    cluster.workers[id]?.send({
      type: ChatHistoryClusterIPCMessage.exit,
      content: "",
      from: ChatHistoryClusterIPCProcessor.primary,
    });
  }
}
