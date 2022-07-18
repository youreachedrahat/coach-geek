const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

// view engine
app.set('view engine', 'ejs');

// database connection
// const PORT = process.env.PORT || 3000;

// app.listen(process.env.PORT || 3000);
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
const dbURI = 'mongodb+srv://admin:admin123@cluster0.2rf47.mongodb.net/LMS?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  //.then((result) => app.listen(process.env.PORT || 3000))
  .then((result) => app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  }))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index', { title: 'Index' }));
app.use(authRoutes);

