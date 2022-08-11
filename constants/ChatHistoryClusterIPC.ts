export const ChatHistoryClusterIPCMessage = {
  exit: "exit",
  process: "process",
  awake: "awake",
} as const;

export type ChatHistoryClusterIPCMessageType =
  typeof ChatHistoryClusterIPCMessage[keyof typeof ChatHistoryClusterIPCMessage];

export const ChatHistoryClusterIPCProcessor = {
  primary: "primary",
  secondary: "secondary",
};

export type ChatHistoryClusterIPCProcessorType =
  typeof ChatHistoryClusterIPCProcessor[keyof typeof ChatHistoryClusterIPCProcessor];
