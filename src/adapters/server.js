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
    const action = actions[req.params.actionName];

    if (!action) {
      next();
    } else {
      const request = http.request.fromExpress(req);

      if (action.preHandler) {
        await action.preHandler(db, request);
      }

      const response = await handleRequest(db, action, request);

      if (action.postHandler) {
        await action.postHandler(db, request, response);
      }

      res.status(response.status).json(response.body);
    }
  });

  // Catch-all
  router.use((req, res) => {
    const r = http.response.notFound();

    res.status(r.status).json(r.body);
  });

  return router;
};

const handleRequest = async (db, action, request) => {
  try {
    if (action.authenticate) {
      if (!request.token) {
        return http.response.badRequest(['Token Required']);
      } else {
        request.user = await db.userByToken(request.token);

        if (!request.user) {
          return http.response.forbidden();
        }
      }
    }

    const errors = await action.validate(db, request);

    if (errors.length > 0) {
      return http.response.badRequest(errors);
    }

    const result = await action.execute(db, request);

    return http.response.success(result);
  } catch (error) {
    return http.response.serverError(error.message);
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