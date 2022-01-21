const { DB_CONNECTION, PORT } = process.env;
const port = PORT || 8080;
const db = require('./database')(DB_CONNECTION);
const actions = require('./actions');
const endpoint = require('./endpoint')(db, actions);
const server = require('./server')(endpoint);

server.listen(port, () => console.log(`Listening on port ${port}`));