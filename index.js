require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.mlz8u.mongodb.net/shopDB?retryWrites=true&w=majority`,{useNewUrlParser:true})
    .then(result=>{
        console.log('sab sahi hai')
    })
    .catch(err=>{
        console.log(err)
    })

app.use(morgan('dev'));
//First default logging should be done
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Enabling CORS(Cross-Origin-Resource-Sharing)
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS Reading resource:
app.use((req,res,next)=>{
    //This middleware doesnt send any response but attaches the required headers to every response 
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');


    //This is basically a request the browser sends to the server before every request, seeking what all requests methods are allowed 
    //in return we (the server) sends a header allowing the methods 
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
    }


    //After we add the required response headers , we call the next middleware in the request response cycle
    next();

    //Note: Access-Control-Allow-Origin and Headers are set every time, and Methods is only set for an OPTIONS request
})


//Parsing of the request body should be done before we handle /products and /orders requests
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