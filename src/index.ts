require('dotenv').config()
import * as express from 'express';
import { organizationRouter } from './api/routes/organizationRouter';
import { userRouter } from './api/routes/userRouter';
const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", userRouter);

app.use("/organization", organizationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });