const { database, server } = require('./adapters');

const db = database(process.env.CONNECTION_STRING);
const app = server(db);

app.start(process.env.PORT || 8080);