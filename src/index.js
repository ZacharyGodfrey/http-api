const db = require('./database')(process.env.CONNECTION_STRING);
const server = require('./server')(db);
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});