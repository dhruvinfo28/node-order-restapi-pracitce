const express = require('express')

const router = express.Router();

//Handling /orders
router.get('/',(req,res)=>{
  res.status(200).json({
      message:"Handling /orders get"
  })  
})

router.post('/',(req,res)=>{
    res.status(200).json({
        message:"Handling post at /orders"
    })
})

router.delete('/:orderID', (req,res)=>{
    res.status(200).json({
        message:"Order deleted",
        id:req.params.orderID
    })
})

module.exports = router;