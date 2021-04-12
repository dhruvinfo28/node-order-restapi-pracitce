const express = require('express')

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling /products "
    })
})

router.post('/',(req,res)=>{
    res.status(200).json({
        message: "Handling /products post requests"
    })
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