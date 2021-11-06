const port = process.env.PORT || 8080;
const connectionString = process.env.CONNECTION_STRING;

const db = require('./database')(connectionString);
const router = require('./router')(db);
const app = require('./app')(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});