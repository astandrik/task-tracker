const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.json());
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

app.listen(3000);
