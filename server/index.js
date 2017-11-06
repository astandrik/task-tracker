/* eslint consistent-return:0 */
const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.get('/api/tasks', (req, res) => {
    fs.readFile(path.join(__dirname, '/tasks.json'), 'utf8', (err, data) => {
        res.send(JSON.parse(data));
    });
});

app.post('/api/tasks', (req, res) => {
    console.log(req);
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
    if (err) {
        return logger.error(err.message);
    }

  // Connect to ngrok in dev mode
    if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
            if (innerErr) {
                return logger.error(innerErr);
            }

            logger.appStarted(port, prettyHost, url);
        });
    } else {
        logger.appStarted(port, prettyHost);
    }
});
