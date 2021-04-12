const express = require('express')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

const app = express();

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.listen(process.env.PORT|| 3000, ()=>{
    console.log("listening")
});