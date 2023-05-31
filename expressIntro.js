const express = require('express');
var bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json())

let categories = [
    {
        "id": 2,
        "description": "Sweet and savory sauces relishes spreads and seasonings",
        "name": "Condiments"
    },
    {
        "id": 1,
        "description": "Soft drinks coffees teas beers and ales",
        "name": "Beverages"
    },
    {
        "id": 3,
        "description": "Desserts candies and sweet breads",
        "name": "Confections"
    },
    {
        "id": 4,
        "description": "Cheeses",
        "name": "Dairy Products"
    },
    {
        "id": 5,
        "description": "Breads crackers pasta and cereal",
        "name": "Grains/Cereals"
    },
    {
        "id": 6,
        "description": "Prepared meats",
        "name": "Meat/Poultry"
    },
    {
        "id": 7,
        "description": "Dried fruit and bean curd",
        "name": "Produce"
    },
    {
        "id": 8,
        "description": "Seaweed and fish",
        "name": "Seafood"
    }
]


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