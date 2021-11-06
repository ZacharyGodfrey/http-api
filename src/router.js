const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json({ works: true });
  });

  return router;
};