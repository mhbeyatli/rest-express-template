const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product
    .find()
    .exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
});

router.post('/', checkAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  
  product
    .save()
    .then(result => {
      console.log("result",result)
      res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
      });
    })
    .catch(err => {
      console.log("err",err)
      res.status(500).json({error: err})
    })
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product
    .findById(id)
    .exec()
    .then(doc => { 
      if (doc) {
        res.status(200).json({ doc: doc })
      } else {
        res.status(404).json({message: 'Given Id is not found'})
      }
      console.log("doc", doc)
    })
    .catch(err => {
      res.status(500).json({error: err})
      console.log(err)
    })
});

router.patch('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Product
    .update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })

});

router.delete('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId
  Product
    .remove({_id: id})
    .exec()
    .then(result => console.log(result))
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
});

module.exports = router;