const express = require('express');

//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
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



//route for the index
app.get('/show', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('pages/show', { blogs: blogs });
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


app.use(express.static('public'));
app.use('/blogs', blogRouter);

// listen port
app.listen(5000);
