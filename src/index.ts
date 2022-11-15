require('dotenv').config()
import * as express from 'express';
import { organizationRouter } from './api/routes/organizationRouter';
import { userRouter } from './api/routes/userRouter';
import * as mongoose  from 'mongoose';
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/AUDIO_WEB', (err: mongoose.CallbackError) => {
  if (err) {
    throw err;
  }
  console.info('mongodb connected successfully')
}) 

app.use(express.json());

app.use("/user", userRouter);

app.use("/organization", organizationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });