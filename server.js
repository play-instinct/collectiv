const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config');
// const { User } = require('/models/user.model');

const app = express();
app.use(bodyParser.json());


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

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});
