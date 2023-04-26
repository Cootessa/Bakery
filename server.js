const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { name } = require('ejs')


//Creates connection to database
var con = mysql.createConnection({
    //Comment out connections when not in use
    host: 'localhost',
    user: 'root',
    password: '4321',
    database: 'bakery'
})

//Allows use of ejs
app.set('view engine', 'ejs')

//Uses folder public
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//Sets up localhost connection
app.listen(3000)


//Gets the pages
app.get("/reviewConfirmationindex", (req, res) =>{
    res.render('reviewConfirmationindex')
})
app.get("/aboutus", (req, res) =>{
    res.render("aboutus")
})
app.get('/orderindex', (req, res) =>{
    res.render('orderindex')
})
app.get('/menuindex', (req, res) =>{
    res.render('menuindex')
})
app.get('/contactindex', (req, res) =>{
    res.render('contactindex')
})
app.get("/confirmationindex", (req, res) =>{
    res.render('confirmationindex')
})

app.get("/checkoutindex", (req, res) =>{
    res.render('checkoutindex')
})


app.post("/orderindex", function(req, res){
    res.redirect('/checkoutindex')
})

//Inserts new review into database
app.post("/review", function(req, res){
    var orderID = req.body.orderNumber;
    var reviewRate = req.body.reviewRate;
    var review = req.body.review;

    
    console.log(orderID, reviewRate, review);

    var sql = 'INSERT INTO review (orderID, reviewRating, reviewDesc) VALUES (?, ?, ?)';

    con.query(sql, [orderID, reviewRate, review], function(err, result){
        if(err){
            throw err
        } 
        else{
        console.log("Data uploaded");
        res.redirect('/reviewConfirmationindex');
        }
    });
});


//Grabs review information from database
app.get("/review", function(req, res){
    var sql = 'SELECT * from customer_reviews';
    con.query(sql, function(err, results){
        if (err){
            throw err
        }
        else{
            res.render("review", { customer_reviews : results })
        }
    })
})


//Would insert into order_placed in database
app.post("/orderindex", function(req, res){
    var item1 = req.body.item1;
    var item1Qty = req.body.item1Qty
    var item2 = req.body.item2;
    var item2Qty = req.body.item2Qty;
    var item3 = req.body.item3;
    var item3Qty = req.body.item3Qty;



    console.log(item1, item1Qty, item2, item2Qty, item3, item3Qty);

    var sql = 'INSERT INTO order_placed () VALUES (?, ?, ?)';

    con.query(sql, [], function(err, result){
        if(err){
            throw err
        } 
        else{
        console.log("Data uploaded");
        res.redirect('/confirmationindex');
        }
    });
});



//Insert customer into database
//Should work once database has proper functions
app.post("/checkoutindex", function(req, res){
    var  firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var streetAddress = req.body.street;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var email = req.body.email;
    var phone = req.body.phone;

    console.log(firstName, lastName, streetAddress, city, state, zip, email, phone);

    var sql = 'INSERT INTO customer (customerFName, customerLName, customerAddress, customerCity, customerState, customerZip, customerEmail, customerPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    con.query(sql, [firstName, lastName, streetAddress, city, state, zip, email, phone], function(err, result){
        if(err){
            throw err
        } 
        else{
        console.log("Data uploaded");
        res.redirect('/orderindex');
        }
    });
}); 









