const express = require('express');
const cors = require('cors');

const dishRoutes = require('./routes/dishRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.use('/api/dishes', dishRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(3000, () => {
    console.log('Server avviato su porta 3000');
});