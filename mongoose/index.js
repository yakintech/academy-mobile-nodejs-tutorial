const { default: mongoose, mongo } = require("mongoose");

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

//IP + username + password

mongoose.connect('mongodb+srv://user_academy:3lY0bfalwD73PClG@cluster0.imfaisw.mongodb.net/mobile-baku')
    .catch(err => {
        console.log('ERR', err);
    })


const { Schema } = mongoose;

//db table - collections
const productSchema = new Schema({
    name: String,
    unitPrice: Number
});

const adminUserSchema = new Schema({
    email: String,
})


const Product = mongoose.model('Product', productSchema);
const AdminUser = mongoose.model('AdminUser', adminUserSchema);

//create
app.post('/api/products', (req, res) => {

    let product = new Product({
        name: req.body.name,
        unitPrice: req.body.unitPrice
    })

    product.save();

    res.status(201).json(product);

})

//getallproducts
app.get('/api/products', (req, res) => {

    Product.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err);
        })

})


//getproductById
app.get('/api/products/:id', (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })

})

//delete
app.delete('/api/products/:id', (req, res) => {

    let id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })

})


app.listen(3001);




