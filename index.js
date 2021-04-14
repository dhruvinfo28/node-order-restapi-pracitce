const express = require('express')
const morgan = require('morgan')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

const app = express();



app.use(morgan('dev'));
//First default logging should be done
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//If any requests doesnt get handled by the above middlewares, this middleware below will listen for all other requests and 
//create a new Error saying the url not found and set the status code to 404
//Then the next() middleware is called along with the error as an argument, and if we have an error 404 that status code will be
//set or if not a request related error 500 status code
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            //Here is the error message, can be a Not found error or other . DB related errors , Usually errors have a message property
            message: error.message
        }
    })
})

app.listen(process.env.PORT|| 3000, ()=>{
    console.log("listening")
});