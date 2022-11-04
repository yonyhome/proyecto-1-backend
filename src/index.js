const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');

const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api', userRoutes);


// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// MongoDB connection
mongoose.connect("mongodb+srv://yonyhome99:clave8375@cluster0.2negbfl.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
