const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')


const con = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '123',
    database: 'sitepoint'
  
})
con.connect(function(err){
    if(err){
        console.log("ERROR CONNECTING TO DB"+ err)
        return
    }
    console.log("CONNECTED TO DB")
})


/*
function handle_database(req,res) {
    pool.query("select * from user_data", function(err,rows){
        if(err) {
            return res.json({'error':true, 'message': 'Error occured '+err})
        }
        res.json(rows)
    })
}
*/
app.get('/', function(req,res) {
    res.render('signup')
})

app.post('/success', function(req, res){
    
        if(err) 
            console.log("ERROR ERROR " +err)
    
        console.log("DATA RECIEVED \n")
       
        let fname = req.body.email
        console.log(fname)
})


app.listen(3002, function(){
    console.log("\nUp & Running @ 3002\n")
})
con.end(function(err){

})