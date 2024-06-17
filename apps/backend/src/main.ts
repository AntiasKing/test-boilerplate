import express, { json } from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import FIFOQueue from './fifoQueue';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;


let fifo: FIFOQueue = new FIFOQueue();

const app = express();

app.use(cors())
app.use(json());

app.get('/action', (req, res) => {
  res.json(fifo.actionPool.map(a => a.json()));
});

app.post('/action', (req, res) => {
  fifo.push(req.body);
  res.sendStatus(200);
});

app.get('/credit', (req, res) => {
  res.json(fifo.creditPool);
});

app.get('/queue', (req, res) => {
  res.json(fifo.queue.map(a => a.json()));
});

fifo.init().then(_ => {
  app.listen(port, host, async () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
})