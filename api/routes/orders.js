const express = require('express')
const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

const router = express.Router();

//Handling /orders
router.get('/',(req,res)=>{
  Order.find({})
    .then(data=>{
        res.status(200).json({
            count: data.length,
            orders: data.map(doc=>{
                return{
                    id: doc._id,
                    productID:doc.productID,
                    quantity: doc.quantity
                }
            })
        })
    })
})

router.post('/',(req,res,next)=>{
    if(req.body.productID == null){
        const error = new Error('Bad request, set the productID property');
        error.status = 400;
        //The next middleware is the middleware in index.js, which handles all kind of errors
        next(error);
    }
    else{
        //Checking that we have that product in our catalog
        Product.findById(req.body.productID)
            .then(prod=>{
                if(prod){
                    const order = new Order({
                        _id: new mongoose.Types.ObjectId(),
                        productID: req.body.productID,
                        quantity: req.body.quantity,
                    })
                    //We could have nested a promise down here , but too much nesting gets messy hence move then block outside 
                    //and catch used is the next one
                    return order.save()
                }
                else{
                    res.status(400).json({
                        error:"Bad Request, The product doesn't exist"
                    })
                }
            })
            .then(ord=>{
                res.status(200).json({
                    message:"Saved",
                    order: ord
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
    }
})

router.delete('/:orderID', (req,res,next)=>{
   Order.findByIdAndDelete(req.params.orderID)
       .then((success)=>{
            res.status(200).json({
                message:"Deleted Successfully",
                order: success
            })
       })
       .catch(error=>{
           console.log(error);
           res.status(500).json({
               message: "Couldn't delete",
               error,
           })
       })
})

module.exports = router;