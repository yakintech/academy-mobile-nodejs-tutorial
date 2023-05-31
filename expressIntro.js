const express = require('express');
var bodyParser = require('body-parser');
const categories = require('./data/categories');
const app = express();

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


//home endpoint
app.get('/', function (req, res) {
    res.send('WEB API HOME PAGE!!');
})

//GET ALL
app.get('/api/categories', function (req, res) {
    res.json(categories)
})


// GET BY ID
//:id url den gelecek ID parametresi demektir
app.get('/api/categories/:id', function (req, res) {
    let id = req.params.id;

    let category = categories.find(q => q.id == id);

    if (category)
        res.json(category)
    else
        res.status(404).json({ 'message': 'Not found!' })
})


//DELETE BY ID
//DELETE ENDPOINT
app.delete('/api/categories/:id', function (req, res) {

    let id = req.params.id;
    categories = categories.filter(q => q.id != id);

    res.send('SUCCESS!!')

})


//POST - CREATE
app.post('/api/categories', function (req, res) {
    
    let name = req.body.name;
    let description = req.body.description;

    let newCategory = {
        id: Math.floor(Math.random() * 999999),
        name: name,
        description: description
    }

    categories.push(newCategory)

    res.status(201).json(newCategory)

})

//UPDATE
app.put('/api/categories/:id', function (req, res) {

    let id = req.params.id;

    let category = categories.find(q => q.id == id);

    if (category) {
        category.name = req.body.name;
        category.description = req.body.description
        res.json(category);
    }
    else {
        res.status(404).json({ 'message': 'Not found!' });
    }

})


app.listen(8080, function () {
    console.log('Server is runnig...');
})















//npm i express
//WEB API ARC