export const DbConst: {
  [key: string]: { name: string; collections: { [key: string]: string } };
} = {
  META: {
    name: "chatdb",
    collections: {
      ROOMS: "rooms",
      USERS: "users",
    },
  },
  HISTORY: {
    name: "chat_history",
    collections: {},
  },
};
