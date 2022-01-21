const { DB_CONNECTION, LOG_CONSOLE, NODE_ENV, PORT } = process.env;

const context = {
    db: require('./database')(DB_CONNECTION),
    logger: require('./logger')({
        useConsole: LOG_CONSOLE === 'true'
    }),
    http: require('./http')({
        environment: NODE_ENV || 'local'
    })
};

const actions = require('./actions');
const requestHandler = require('./request-handler')(context, actions);
const server = require('./server')(context, requestHandler);
const port = PORT || 8080;

server.listen(port, () => {
    context.logger.info(`API is listening on port ${port}`);
});