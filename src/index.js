const db = require('./database')(process.env.CONNECTION_STRING);
const server = require('./server')(db);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${port}`);
});