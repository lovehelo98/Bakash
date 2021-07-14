import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import path from 'path';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ShopUp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
const connection = "mongodb+srv://bakash:bakash@cluster0.tqnqm.mongodb.net/bakash?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));
app.use(express.static(path.join(dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(dirname, '/frontend/build/index.html'))
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})

app.use('/api/uploads', uploadRouter);

const __dirname = path.resolve();
