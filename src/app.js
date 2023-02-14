import express from 'express';
import { notFound, errorHandler } from './middlewares.js';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'working...',
  });
});

app.use('/startTimer', (req, res) => {
  startTimer(req, res);
});

app.use('/save', (req, res) => {

})

app.use(notFound);
app.use(errorHandler);

export default app;
