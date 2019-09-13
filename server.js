const express=require('express')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
const port=process.env.PORT||8080
const app=express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var indexRouter = require('./public/routes/index');
var usersRouter = require('./public/routes/users');
var favoriteRouter = require('./public/routes/favorite');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/favorite', favoriteRouter);

app.use(express.static(__dirname+'/dist/'))
app.get(/.*/,(req,res)=>{
  res.sendFile(__dirname+'/dist/index.html')
})
app.listen(port)
console.log('start!!!');
