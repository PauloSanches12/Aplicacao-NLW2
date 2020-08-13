import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Faz o express entender json
app.use(routes);

app.listen(3333);