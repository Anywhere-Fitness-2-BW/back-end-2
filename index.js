const server = require("./server/server.js");
const port = process.env.PORT || 7070;

server.listen(port, () => {
  console.log("\n==RUNNING ON 7070==\n");
});