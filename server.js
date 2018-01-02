require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {userRouter} = require('./routers/user.router');
const {workRouter} = require('./routers/work.router');
const {DATABASE_URL, PORT} = require('./config/main');



// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/api/work', workRouter);



let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => mongoose.connect(databaseUrl, (err) => {
        if (err) {
            return reject(err);
        }
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            return resolve();
        })
      .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
      });
        return server;
    }));
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close((err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    }));
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };


