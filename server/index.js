require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const bodyParser = require('body-parser');

const dbConfig = require('./dbConfig/dbConfig.js');
const userRoute = require('./routes/userRoutes.js');
const productRoute = require('./routes/productRoutes.js');
const paymentRoute = require('./routes/paymentRoute.js');
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT,PATCH, DELETE',
    credentials: true,
}));

app.use('/api/users',userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders',paymentRoute);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`NodeJS/Express Server Started On Port ${port}`);
});
