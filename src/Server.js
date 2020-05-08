/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import { config } from 'dotenv'; // Configurar variáveis ambientes
// import favicon from 'serve-favicon';

import Routes from './Routes';

config();

// eslint-disable-next-line import/first
import './services/Mongoose';

// Criação do servidor
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Novas conexões WebSocket
io.on('connection', (socket) => {
  console.log(`Nova conexão - ${socket.id}`);
});

// Configuração do servidor
app.use(cors());
app.use(express.json());
app.use(Routes);

const port = process.env.PORT || 3000;

// Configuração do servidor estático
const baseDir = `${__dirname}/../public/`;

app.use(express.static(`${baseDir}`));
app.get('/', (req, res) => res.sendFile('index.html', { root: baseDir }));
// app.use(favicon(`${baseDir}/favicon.ico`));

// Iniciar o servidor
server.listen(port, (err) => {
  if (err) console.error(err.message);
  else console.log(`Server listing on ${port}`);
});
