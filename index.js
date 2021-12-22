const express = require('express');
const bodyParser = require("body-parser")
const app = express();

const { connect } = require("mongoose")

// set the view engine to ejs
app.set('view engine', 'ejs');

// set public folder
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// use res.render to load up an ejs view file

const Contact = require("./models/contact");

// index page
app.get('/', function(req, res) {
  res.render('index');
});

// about page
app.post('/contact-form', async function(req, res) {

  const { name, email, message } = req.body;

  const newContact = new Contact({
    email,
    name,
    message
  })

  await newContact.save();

  res.render("success", {
    name,
    link: "/contacts"
  })
});

app.get('/contacts', async function(req, res) {
  const contacts = await Contact.find({});
  res.render('contacts', {
    contacts
  });
});


const PORT = process.env.PORT || 5000;
const MONGO_DB = "mongodb+srv://zuri:zuri123@cluster0.wrxuq.mongodb.net/hng_task2?retryWrites=true&w=majority";
// const MONGO_DB = "mongodb://localhost:27017/resume";

try {
  connect(MONGO_DB);
  console.log(`Database connected to ${MONGO_DB}`)
  app.listen(PORT || 3000, () => {
      console.log(`Server running on port ${PORT}`);
  })
} catch (err) {
  console.log(err);
}