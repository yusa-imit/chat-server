import {
  ChatHistoryClusterIPCMessageType,
  ChatHistoryClusterIPCProcessorType,
} from "../constants/ChatHistoryClusterIPC";
export interface ChatHistoryClusterIPC {
  type: ChatHistoryClusterIPCMessageType;
  content: any;
  from: ChatHistoryClusterIPCProcessorType;
}
