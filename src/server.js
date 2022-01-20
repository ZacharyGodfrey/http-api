const express = require('express');

const { http } = require('./util');
const endpoint = require('./endpoint');

module.exports = (db) => {
    const server = express();

    server.set('json spaces', 2);
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());

    // CORS
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

    // Request Handler
    server.post('/:actionName', endpoint(db));

    // 404
    server.use((req, res) => {
        const r = http.response.notFound();

        res.status(r.status).json(r.body);
    });

    return server;
};