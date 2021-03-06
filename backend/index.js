const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var express = require('express')
var app = express()
var helper = require('./helper');
var db = null;
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use((req, res, next) => { //doesn't send response just adjusts it

    res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over

})

app.post('/insertfrommealdb', function (req, response) {
    if (req.body && !req.body.idMeal) {
        req.body.idMeal = parseInt(Math.random(new Date().getTime()) * 10000000);
    }
    db.collection("recipes").insertOne(req.body).then((res, err) => {
        console.log(response);
        console.log(err);
        response.send('{success: "success"}')
    })
})

app.put('/updateRecipe', function (req, response) {
    let updatedRecipe = req.body;
    delete updatedRecipe._id;
    db.collection("recipes").update({idMeal: updatedRecipe.idMeal}, updatedRecipe, {}, function (err, docs) {
        console.log(response);
        console.log(err);
        response.send('{success: "success"}')
    });
})

app.post('/insertcategories', function (req, response) {
    db.collection("categories").insertOne(req.body).then((res, err) => {
        console.log(res);
        console.log(err);
        response.send('{success: "success"}')
    })
})

app.get('/insert', function (req, res) {
    db.collection("insert").insertOne({insertColumn: 'asfdsadfasdfasdf'}).then((res, err) => {
        console.log(res);
        console.log(err);
    })
    res.send('success')
})

app.get('/getById/:id', function (req, response) {
    const id = req.params.id;
    db.collection("recipes").find({idMeal: id}).toArray(function (err, docs) {
        response.status(200);
        response.send(JSON.stringify(docs))
    });
})

app.get('/getCategories', function (req, response) {
    // var result = db.collection('recipes').aggregate([
    //     {
    //         $lookup: {
    //             from: "categories",
    //             localField: "strCategory",
    //             foreignField: "strCategory",
    //             as: "categories_"
    //         }
    //     },
    //     {
    //         $group: {_id: null, uniqueValues: {$addToSet: "$strCategory", $addToSet: "$categories_"}}
    //     }
    // ]);
    // result.toArray(function (err, docs) {
    //     console.log(docs);
    //     response.send(JSON.stringify(docs[0].uniqueValues.map((item) => {
    //         return {
    //             strCategory: item[0].strCategory,
    //             strCategoryThumb: item[0].strCategoryThumb,
    //             strCategoryDescription: item[0].strCategoryDescription
    //         };
    //     })));
    // });

    db.collection("categories").find().toArray(async function (err, docs) {
        let myData = await helper.asyncMap(docs, db);
        console.log(myData);
        response.status(200);
        response.send(JSON.stringify(myData))
    });
})

app.get('/getRecipesByCategory/:category', function (req, response) {
    let category = req.params.category;
    let columnSelector = {strMeal: true, strMealThumb: true, idMeal: true};
    let query = {strCategory: category};
    db.collection("recipes").find(query).project(columnSelector).toArray(function (err, docs) {
        response.status(200);
        response.send(JSON.stringify(docs))
    });
})

app.get('/get/:some', function (req, res) {
    let param = req.params.some;
    db.collection("insert").find({insertColumn: new RegExp(param)}).find().toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/searchrecipe/:searchValue/:itemsPerPage/:pageNumber', function (req, res) {
    let searchValue = req.params.searchValue;
    let itemsPerPage = parseInt(req.params.itemsPerPage);
    let pageNumber = parseInt(req.params.pageNumber);
    let query = {
        $or: [
            {strInstructions: new RegExp(searchValue)},
            {strMeal: new RegExp('chicken')}
        ]
    };
    db.collection("recipes").find(query).skip(itemsPerPage * (pageNumber - 1)).limit(itemsPerPage).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/getallrecipes/:itemsPerPage/:pageNumber', function (req, res) {
    let itemsPerPage = parseInt(req.params.itemsPerPage);///.*m.*/
    let pageNumber = parseInt(req.params.pageNumber);
    db.collection("recipes").find({}).skip(itemsPerPage * (pageNumber - 1)).limit(itemsPerPage).toArray(function (err, docs) {
        //db.collection("recipes").update()
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/getrecipescount', function (req, res) {
    db.collection("recipes").count().then((data) => {
        res.send(JSON.stringify(data))
    })
})

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    app.listen(2000)
    //client.close();
});