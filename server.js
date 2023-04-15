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

//Just to make sure connection works with actual database
/*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM product", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/

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

//Commented out atm because of get function
/*app.get("/checkoutindex", (req, res) =>{
    res.render('checkoutindex')
})*/


//Inserts new review into database
app.post("/", function(req, res){
    var customerID = req.body.custFName;
    var custLName = req.body.custLName;
    var reviewRate = req.body.reviewRate;
    var review = req.body.review;

    //Atm you have to force enter a customerID due to lack of database functionality on this part
    console.log(customerID, custLName, reviewRate, review);

    var sql = 'INSERT INTO review (customerID, reviewRating, reviewDesc) VALUES (?, ?, ?)';

    con.query(sql, [customerID, reviewRate, review], function(err, result){
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
//Don't know how variables would work
/*app.post("/", function(req, res){
    

    console.log();

    var sql = 'INSERT INTO order_placed () VALUES (?, ?, ?)';

    con.query(sql, [], function(err, result){
        if(err){
            throw err
        } 
        else{
        console.log("Data uploaded");
        res.redirect('/checkoutindex');
        }
    });
});*/



//Insert customer into database
//Should work once database has proper functions
/*app.post("/", function(req, res){
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
        res.redirect('/confirmationindex');
        }
    });
}); */

//This will grab the total, quantity, and items ordered from database for an order
/*app.get("/checkoutindex", function(req, res){
    var sql = 'SELECT * from ';
    con.query(sql, function(err, results){
        if (err){
            throw err
        }
        else{
            res.render("checkoutindex", { order_details : results })
        }
    })
})*/







