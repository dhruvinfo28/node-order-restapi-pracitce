const express = require('express')

const router = express.Router();

//Handling /orders
router.get('/',(req,res)=>{
  res.status(200).json({
      message:"Handling /orders get"
  })  
})

router.post('/',(req,res,next)=>{
    if(req.body.productID == null || req.body.quantity==null){
        const error = new Error('Bad request, set the productID and quantity properties');
        error.status = 400;
        //The next middleware is the middleware in index.js, which handles all kind of errors
        next(error);
    }
    else{
        const order = {
            productID: req.body.productID,
            quantity: req.body.quantity,
        }
        res.status(200).json({
            message:"Handling post at /orders",
            order,
        })
    }
})

router.delete('/:orderID', (req,res)=>{
    res.status(200).json({
        message:"Order deleted",
        id:req.params.orderID
    })
})

module.exports = router;