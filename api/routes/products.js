const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')

const router = express.Router();

router.get('/',(req,res,next)=>{
    Product.find({})
        .then(data=>{
            res.status(200).json({
                products:data
            })
        })
        .catch(err=>{
            console.log(err)
            next(err);
        })

})

router.post('/',(req,res,next)=>{
    if(req.body.name == null || req.body.price == null){
        const error = new Error('Set the name and price')
        error.status = 400;
        next(error);
    }
    else{
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        })
        product.save()
            .then(result=>{
                res.status(200).json({
                    message: "The following product was saved",
                    product,
                })
            })
            .catch(err=>{
                console.log(err);
                next(err);
            })
    }
})

router.patch('/:productID',(req,res)=>{
    res.status(200).json({
      message: "Handling patch",
      id: req.params.productID,  
    })
})

router.delete('/:productID',(req,res)=>{
    res.status(200).json({
      message: "Handling delete",
      id: req.params.productID,  
    })
})

module.exports = router;