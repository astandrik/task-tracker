/* eslint consistent-return:0 */
const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const bodyParser = require('body-parser');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// parse application/json
app.use(bodyParser.json());


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.get('/api/tasks', (req, res) => {
    fs.readFile(path.join(__dirname, '/tasks.json'), 'utf8', (err, data) => {
        res.send(JSON.parse(data));
    });
});

app.post('/api/tasks', (req, res) => {
    if (req.body && req.body.id !== -1) {
        const id = req.body.id;
        const value = req.body.value;
        fs.readFile(path.join(__dirname, '/tasks.json'), 'utf8', (err, data) => {
            const parsed = JSON.parse(data);
            const dataObj = parsed.tasks.filter((x) => x.id === id)[0];
            dataObj.message = value;
            fs.writeFile(path.join(__dirname, '/tasks.json'), JSON.stringify(parsed), (error) => {
                res.send(error || { message: 'ok' });
            });
        });
    } else {
        fs.readFile(path.join(__dirname, '/tasks.json'), 'utf8', (err, data) => {
            const parsed = JSON.parse(data);
            let lastId;
            if (parsed.tasks) {
                lastId = parsed.tasks.map((x) => x.id).map((x) => parseInt(x, 10)).sort((a, b) => b - a)[0];
                lastId += 1;
                parsed.tasks.push({ id: lastId, message: '' });
            } else {
                lastId = 1;
                parsed.tasks = [{ id: lastId, message: '' }];
            }
            fs.writeFile(path.join(__dirname, '/tasks.json'), JSON.stringify(parsed), (error) => {
                res.send(error || { message: 'ok' });
            });
        });
    }
});

app.delete('/api/tasks', (req, res) => {
    const id = req.body.id;
    fs.readFile(path.join(__dirname, '/tasks.json'), 'utf8', (err, data) => {
        const parsed = JSON.parse(data);
        const tasks = parsed.tasks.filter((x) => x.id !== id);
        parsed.tasks = tasks;
        fs.writeFile(path.join(__dirname, '/tasks.json'), JSON.stringify(parsed), (error) => {
            res.send(error || { message: 'ok' });
        });
    });
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
