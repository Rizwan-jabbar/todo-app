import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

const mongoURI = 'mongodb://127.0.0.1:27017/todoDB'; 

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected successfully');

    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});


