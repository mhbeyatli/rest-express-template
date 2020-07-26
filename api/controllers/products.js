const mongoose = require('mongoose')

const Product = require('../models/product')

exports.get_all_products = (req, res, next) => {
  res.status(200).json({message: 'this is message'})
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
}

exports.create_product = (req, res, next) => {
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
        message: 'Product is created',
        createdProduct: product
      });
    })
    .catch(err => {
      console.log("err",err)
      res.status(500).json({error: err})
    })
}

exports.get_one_product = (req, res, next) => {
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
    })
}

exports.update_product = (req, res, next) => {
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
      res.status(500).json({error: err})
    })
}

exports.delete_product = (req, res, next) => {
  const id = req.params.productId
  Product
    .remove({_id: id})
    .exec()
    .then(result => console.log(result))
    .catch(err => {
      res.status(500).json({error: err})
    })
}