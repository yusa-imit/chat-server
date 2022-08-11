import { Chat } from "../../../type/Chat";

abstract class Singleton {
  private static history: { [key: string]: Chat[] } = {};
  static flush() {
    this.history = {};
  }
  static insert(roomId: string, chat: Chat) {
    if (!this.history[roomId]) {
      this.history[roomId] = [];
    }
    this.history[roomId].push(chat);
  }
  static getHistory() {
    return this.history;
  }
}

export { Singleton as ChatHistoryManager };
