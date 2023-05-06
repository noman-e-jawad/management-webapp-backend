import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { db, port } from './config/config';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json({ type: '*/*' }));

app.use('/api', routes);
app.all('/', (req, res) => {
  console.log('Just got a request!');
  res.send('Yo!');
});

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on   + ${port}`);
    });
  })
  .catch();
