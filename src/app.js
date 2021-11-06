const express = require('express');

module.exports = (router) => {
  const app = express();

  app.set('json spaces', 2);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use((req, res, next) => {
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

  app.use(router);

  return app;
};