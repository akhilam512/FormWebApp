const express = require('express')
const http = require('http')
const request = require('request')
const bodyParser = require('body-parser')  //for parsing POST requests
const mysql = require('mysql')
const crypto = require('crypto') // for hasing passwords
const app = express()

app.use(express.static(__dirname + '/public'));//allows access of static files to express in the public directory
var urlencodedParser = bodyParser.urlencoded({ extended: true})
app.use(bodyParser.json());
app.set('view engine', 'ejs')


const con = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '123',
    database: 'user'
  
})

con.connect(function(err){
    if(err){
        console.log("ERROR CONNECTING TO DB"+ err)
        return
    }
    console.log("CONNECTED TO DB")
})



app.get('/', function(req, res){
    res.render('home')
})

app.get('/signin', function(req, res){
    res.render("signin", {user: req.query})

})

app.post('/signin',  urlencodedParser, function(req, res){
    given_mail = req.body.mail 
    given_pass = req.body.pw
    query_string = `SELECT email, pass FROM personal where email = ${given_mail} AND pass = ${given_pass}`
    con.query(query_string, function(err, result){
        if(err)
        {    console.log("ERROR DB - LOGIN" +err)
            res.render("error_signin.ejs")
    }
 
    else{
        
        res.render("success_signin", {data: req.body})
        }
    } )

})



app.get('/signup', function(req,res) {
    res.render("signup", {user: req.query})
    
})


app.post('/signup', urlencodedParser, function(req, res){
    res.render("success_signup", {data: req.body})

    var users={
        "first_name":req.body.fname,
        "last_name" :req.body.lname,
        "email"     :req.body.email,
        "gender"    :req.body.gender,
        "pass"      :req.body.pw1
    }
    
    con.query('INSERT INTO personal SET ?', users, function(err, results, fields){
        if(err)
            console.log("Error inserting")
        else{
            console.log("Success! Inserted: ", results)
        }
    })
})       


app.listen(3003)A
