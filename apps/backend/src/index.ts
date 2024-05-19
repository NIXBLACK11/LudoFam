import WebSocket, { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';
import express from 'express';

import { GameBoard } from "@repo/common/game";
import { GameManager } from "./GameManager";

dotenv.config();

// import { name } from '@repo/common/config';
// console.log(name);

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "hello"
    })
})

const httpServer = app.listen(3000);

const wss = new WebSocketServer({ server: httpServer });

const games = new GameManager();

wss.on('connection', function connection(socket) {
    games.handleMessages(socket);
    
    // socket.on('disconnect', () => games.removeUser(socket));

    socket.on('error', console.error);

    // socket.send(`Connection made successfully`);
    console.log(`Connection made successfully`);
});