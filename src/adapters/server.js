const express = require('express');
const http = require('./http');
const actions = require('../actions');

const createServer = (router) => {
  const server = express();

  server.set('json spaces', 2);
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use((req, res, next) => {
    // Allow CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');

    // Remove headers that leak information
    res.removeHeader('x-powered-by');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  server.use(router);

  return server;
};

const createRouter = (db) => {
  const router = express.Router();

  // Request logging
  router.use((req, res, next) => {
    console.info(`${req.method} - ${req.originalUrl}`);

    next();
  });

  // Defined endpoints
  router.post('/:actionName', async (req, res) => {
    const request = http.request.fromExpress(req);
    const r = await handleRequest(req.params.actionName, request, db);

    res.status(r.status).json(r.body);
  });

  // Catch-all
  router.use((req, res) => {
    const r = http.response.notFound();

    res.status(r.status).json(r.body);
  });

  return router;
};

const handleRequest = async (actionName, request, db) => {
  try {
    const action = actions[actionName];

    if (!action) {
      return http.response.notFound();
    }

    const handler = action.handler(db);
    let user = null;

    if (handler.authenticate) {
      if (!request.token) {
        return http.response.forbidden();
      } else {
        user = db.userByToken(request.token);

        if (!user || !(await handler.authorize(user))) {
          return http.response.forbidden();
        }
      }
    }

    const errors = await handler.validate(user, request.data);

    if (errors.length > 0) {
      return http.response.badRequest(errors);
    }

    const result = await handler.execute(user, request.data);

    return http.response.success(result);
  } catch (error) {
    return http.response.serverError();
  }
};

module.exports = (db) => {
  const router = createRouter(db);
  const server = createServer(router);

  return {
    start: (portNumber) => {
      server.listen(portNumber, () => {
        console.log(`Server started on port ${portNumber}`);
      });
    }
  };
};