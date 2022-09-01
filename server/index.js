const express = require('express');
const cors = require("cors");
const path = require('path');

const app = express();

// app.use(rollbar.errorHandler())

app.use(cors());
app.get('/api/turtles', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.log("Accessed HTML successfully");
});

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'a333073e3e8e4c1c9feea25cd67de5df',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!');

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

app.get('/api/turtles', (req, res) => {
    res.status(200).send(turtles)
    rollbar.info("Someone pull up a turtle");
});

app.post('/api/turtles', (req, res) => {
    let {name} = req.body
 
    const index = turtles.findIndex(turtle => {
        return turtle === name
    })
 
    try {
        if (index === -1 && name !== '') {
            turtles.push(name)
            rollbar.log("Turtles added successfully", {author: "Boty", type: "manual entry"});
            res.status(200).send(turtles)
        } else if (name === ''){
             rollbar.error("No name provided")
            res.status(400).send('You must enter a name.')
        } else {
             rollbar.error("Turtle already exist");
            res.status(400).send('That turtle already exists.')
        }
    } catch (err) {
        console.log(err)
    }
 })
 
 app.delete('/api/turtles/:index', (req, res) => {
     const targetIndex = +req.params.index
     
     turtles.splice(targetIndex, 1)
     rollbar.info("Turtles was deleted");
     res.status(200).send(turtles)
 })