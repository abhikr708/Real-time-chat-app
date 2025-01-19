const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 4001;  

app.use(cors());

app.get('/', (req, res)=>{
    res.send("Wlecome to the Chatbox");
})

const server = http.createServer(app);

// Setting up a socket with the server  
const io = socketIO(server);

io.on('connection', ()=>{
    console.log("New connection");
})


server.listen(port, () => console.log(`Listening on port ${port}`));
