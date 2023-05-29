import express, { Request, Response, NextFunction, Errback } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Constants from './util/constants';
import authRoute from './routes/authRoute';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoute);

app.use((err: any, req: express.Request, res: Response, next: NextFunction) => {
   const error = {
      status: err?.statusCode | 500,
      error: err?.data,
      message: err?.message,
   };
   res.status(error.status).json(error);
});

// Connection to the mongo DB
mongoose
   .connect(Constants.DB_URI)
   .then(() => {
      console.log('Connected to MongoDB');
      app.listen(3001);
   })
   .catch((err) => {
      console.log(err);
   });
