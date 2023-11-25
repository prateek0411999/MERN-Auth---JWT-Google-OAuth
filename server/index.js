
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

app.use('/posts', postRoutes)
app.use('/health',(req,res)=>{
    res.send('Server is running fine.')
});
app.use('/user', userRoutes);
const PORT= process.env.PORT || 3000;

mongoose.connect(process.env.Connection_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        app.listen(PORT , ()=> {console.log(`server running on port: ${PORT}`)})
    })
    .catch(()=>{
        mongoose.set('useFindAndModify',false);
    })

