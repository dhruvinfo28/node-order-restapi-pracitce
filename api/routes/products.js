const express = require('express')

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling /products "
    })
})

router.post('/',(req,res,next)=>{
    if(req.body.name == null || req.body.price == null){
        const error = new Error('Set the name and price')
        error.status = 400;
        next(error);
    }
    else{
        const product = {
            name: req.body.name,
            price: req.body.price
        }
        res.status(200).json({
            message: "Handling /products post requests",
            product,
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