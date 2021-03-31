const express = require('express');
const cors = require('cors')
require('dotenv').config()
//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const orderRouter = require('./routes/order');
const Blog = require('./models/Blog');
const Order = require('./models/Order');
const app = express();

//connect to mongoose
mongoose.connect('mongodb+srv://user:user@hundred.qf4a8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('connected...'));

//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors())


//route for the index
app.get('/show', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('pages/show', { blogs: blogs });
});

//route for the index
app.get('/order/show', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('pages/show', { blogs: blogs });
});

app.get('/orders', async (request, response) => {
  let blogs = await Order.find().sort({ timeCreated: 'desc' });

  response.render('pages/orders', { blogs: blogs });
});

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about');
});

// about page
app.get('/create', function (req, res) {
  res.render('pages/new');
});




app.use(express.static(__dirname + '/public'));
app.use('/blogs', blogRouter);
app.use('/order', orderRouter);

// listen port
app.listen(5000);
