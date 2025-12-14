import express from 'express';
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute";

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.use('/user',userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});