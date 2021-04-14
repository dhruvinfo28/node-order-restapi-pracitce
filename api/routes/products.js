const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')

const router = express.Router();

router.get('/',(req,res,next)=>{
    Product.find({})
        .then(data=>{
            const response = {
                count: data.length,
                //map returns a new array, mapping through every doc and sending meta data along with fetched data
                products: data.map(doc=>{
                   return {
                       name: doc.name,
                       price: doc.price,
                       id: doc._id,
                       details:{
                           type: 'GET',
                           url: 'http://localhost:3000/products/' + doc._id
                       }
                   } 
                })
            }
            res.status(200).json(response);
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
                res.status(201).json({
                    message: "The following product was saved",
                    product: {
                                name: result.name,
                                price: result.price,
                                details:{
                                    type: 'GET',
                                    url: `http://localhost:3000/products/${result._id}`
                                }
                            }
                })
            })
            .catch(err=>{
                console.log(err);
                next(err);
            })
    }
})

router.get('/:productID',(req,res,next)=>{
    Product.findById(req.params.productID).select('name price _id')
        .then(data=>{
            if(data)
                res.status(200).json(data);
            else{
                const error = new Error('No product found with this id');
                error.status = 404;
                next(error);
            }
                
        })
        .catch(err=>{
            console.log(err)
            next(err);
        })
})

router.patch('/:productID',(req,res,next)=>{
    Product.updateOne({_id:req.params.productID}, {$set: req.body})
        .then(message=>{
            res.status(200).json({
                message:'Product updated',
                details:{
                    type:"GET",
                    url:`http://localhost:3000/products/${req.params.productID}`
                }
            })
        })
        .catch(err=>{
            console.log(err);
            next(new Error(err));
        })
})

router.delete('/:productID',(req,res)=>{
   Product.findByIdAndDelete(req.params.productID)
    .then(success=>{
        res.status(200);
        res.json({
            product: success,
            message: 'deleted'
        })
    })
    .catch(err=>{
        next(new Error(err));
    })
})

module.exports = router;