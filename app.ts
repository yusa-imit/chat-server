import { server } from "./server/server";
import "dotenv/config";

const port = process.env.PORT || "5000";
const SERVER_START_MESSAGE = `Server listening on port ${port}`;

server.listen(port, () => {
  console.log(SERVER_START_MESSAGE);
});
