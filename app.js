var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const { check, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var itemData = require('./utility/itemDB');
var signIn = require('./Controller/ProfileController.js');
var login = require('./Controller/ProfileController.js');

app.set('view engine','ejs');
app.set('views','View');
app.use('/ressources', express.static('ressources'));
app.use('partials',express.static('partials'));
app.use(signIn);
app.use(login);


var server = http.createServer(app);

  app.get('/about',function(req,res){
      res.render('about');
    });

app.get('/Cart',function(req,res){
  res.render('cart');
});

app.get('/categories',function(req,res){
  var data = itemData.getItems();
  console.log(itemData.getItems())
  res.render('categories', {data: data});
});

app.get('/contactUs',function(req,res){
  res.render('contactUs');
});


app.get('/index',function(req,res){
  res.render('index');
});

app.get('/',function(req,res){
  res.render('index');
});

app.get('/item*',urlencodedParser,[check('itemCode').optional().isAlphanumeric().withMessage('itemCode has to be AlphaNumeric'),
sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
    }

else{

  var data = itemData.getItem(req.query.itemCode);
  console.log('my data - '+ data);
  res.render('item', {data: data});
}
});

app.get('/myItems',function(req,res){
  if(req.session.theUser){
  res.locals.theUser="signedIn";
}
  res.render('myItems');
});

app.get('/myShoes',function(req,res){

  if(req.session.theUser){
  res.locals.signedInUser="signedIn";
}
  res.render('myShoes');
});

app.get('/mySwaps',function(req,res){

  console.log('my swap - '+ data);
  if(req.session.theUser){
  res.locals.signedInUser=req.session.theUser;
}
res.render('mySwaps');

});



app.get('/store',function(req,res){
  res.render('store');
});

app.get('/swap*',urlencodedParser,[check('itemCode').optional().isAlphanumeric().withMessage('itemCode has to be AlphaNumeric'),
sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{
  var data = itemData.getItem(req.query.itemCode);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
    }

else{
  console.log('my swap - '+ data);
  if(req.session.theUser){
  res.locals.signedInUser="signedIn";
  }
}
  res.render('swap',{data: data});
});


server.listen(3000, '127.0.0.1');
console.log('yo dawgs, now listening to port 3000');
