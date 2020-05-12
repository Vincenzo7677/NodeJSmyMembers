const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/dojo',{useUnifiedTopology: true})
const db = mongoose.connection

//Check connection
db.once('open', function () {
    console.log("Connected to MongoDB...")
})
//Check for DB errors
db.on('error', function (err) {
    console.log(err)
})

//Init App
const app = express()

//Bring in Model
const Member = require('./models/member')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Body-Parser middleware /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Set Public Folder
app.use(express.static(path.join(__dirname,'public')))




//Home route
app.get('/', (req,res) => {
    Member.find({}, function(err,members){
       if (err){
        console.log(err)
       }else{
        res.render('index', {
            title: 'Members',
            members:members
        })
       }
    })
    
})

//Add Route
app.get('/members/add', (req,res) => {
    res.render('add_members', {
        title: 'Add Members'
    })
})

//Get single Member
app.get('/members/:id', (req,res) => {
    Member.findById(req.params.id, (err,member) => {
        res.render('member', {
            member: member
        })
    })
})

//Add Submit POST route
app.post('/members/add', (req,res) => {
   const member = new Member()
   member.name = req.body.name
   member.address = req.body.address
   member.birthday = req.body.birthday
   member.status = req.body.status
   member.body = req.body.body

   member.save( (err) => {
       if (err) {
           console.log(err)
       }else {
           res.redirect('/')
       }
   })
})

//Load Edit Form
app.get('/members/edit/:id', (req,res) => {
    Member.findById(req.params.id, (err,member) => {
        res.render('edit_member', {
            title: 'Edit',
            member: member
        })
    })
})

//Update Submit
app.post('/members/edit/:id', (req,res) => {
    const member = {}
    member.name = req.body.name
    member.address = req.body.address
    member.birthday = req.body.birthday
    member.status = req.body.status
    member.body = req.body.body

 const query = { _id:req.params.id }

    Member.updateOne(query, member, (err) => {
        if (err) {
            console.log(err)
            return
        }else {
            res.redirect('/')
        }
    })
 })

 app.delete('/member/:id', (req,res) => {
  const query = { 
      _id:req.params.id
    }
   
   Member.deleteOne(query, (err) => {
       if (err) {
           console.log(err)
       }
       res.send('Success')
   })
 })
//Start Server
app.listen(3000)