import express from "express";

const app = express();
const port = process.env.PORT || "5000";
const SERVER_START_MESSAGE = `Server listening on port ${port}`;

app.listen(port, () => {
  console.log(SERVER_START_MESSAGE);
});
