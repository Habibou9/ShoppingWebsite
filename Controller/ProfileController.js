var express = require('express')
var path = require('path');
var app = module.exports = express();
var session = require('express-session');
var bodyParser = require('body-parser');
'use strict';
var crypto = require('crypto');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const { check, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.set('view engine','ejs');
app.set('views','View');
app.use('/ressources', express.static('ressources'));
app.use('partials',express.static('partials'));
app.use(session({secret: "nbad session secret"}));

var itemData = require('../utility/itemDB');
var userData = require('../utility/userDB');

app.get('/signIn*',function(req,res){
  console.log(req.url)
  var userSessionInfo = req.session.theUser;
  if(userSessionInfo !== undefined){
    console.log('undefined')
    return res.render('mySwaps.ejs', {theUser:userSessionInfo})

  }
  else{
    console.log('Defined')
    userSessionInfo= userData.getUserItems(1);
      console.log('info - '+userSessionInfo.user1.firstName);
      res.render('myItems.ejs',{ theUser:userSessionInfo});
  }
})

app.get('/profile*',urlencodedParser,[
check('action').optional().isAlpha().withMessage('action has to be Alpha'),
check('itemCode').optional().isAlphanumeric().withMessage('itemCode has to be AlphaNumeric'),
sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{

  const errors = validationResult(req);
  var userSessionInfo= userData.getUserItems(1);
  console.log('info session'+userSessionInfo);
  res.locals.signedInUser=userSessionInfo;

    if (!errors.isEmpty()) {
      console.log('action - '+ req.query.action)
      console.log(errors.array()[0].msg)
      res.render('myItems',{theUser:userSessionInfo})
      }

  else{

  if(req.query.action =='update'){

          console.log('3')
          console.log(userSessionInfo)
            console.log('4'+ req.query.itemCode)
            for(var i=0;i<userSessionInfo.userItems.length;i++){
            if(userSessionInfo.userItems[i].item.itemCode == req.query.itemCode){
              console.log('5')
              if(userSessionInfo.userItems[i].Status == 'Swapped'|| userSessionInfo.userItems[1].Status == 'Available'){
                console.log('6')
                  var data = itemData.getItem(req.query.itemCode)
                    console.log(data)
                    res.render("item.ejs",{data:data});
                }
                else if(userSessionInfo.userItems[i].Status == 'Offer Received' || userSessionInfo.userItems[i].Status == 'Offer Made'){
                  var data = userData.getUserItems(1)
                  console.log('Myswaps1 -'+data)
                  res.render("mySwaps.ejs",{data:data});
                }
              }
            }
        }
        else if(req.query.action ="showSwaps"){
          res.render("mySwaps.ejs",{data:userSessionInfo});
      }

      else if(req.query.action =='accept'){
          if(userSessionInfo.userItems[1].item.itemCode == req.query.itemCode){
          if(userSessionInfo.userItems[1].Status == 'pending') {
            userSessionInfo.userItems[1].Status = 'Swapped'
            res.render('myItems.ejs',{theUser:userSessionInfo});
           }
          }
        }

        else if(req.query.action =='reject'){
          if(userSessionInfo.userItems[1].item.itemCode == req.query.itemCode){
            if(userSessionInfo.userItems[1].Status == 'pending'){
              userSessionInfo.userItems[1].Status = 'Available'
            res.render('myItems.ejs',{theUser:userSessionInfo});
           }
          }
        }

        else if(req.query.action =='withdraw'){
          if(userSessionInfo.userItems[1].item.itemCode == req.query.itemCode){
            if(userSessionInfo.userItems[1].Status == 'pending'){
              userSessionInfo.userItems[1].Status = 'Available'
            res.render('myItems',{theUser:userSessionInfo});
           }
          }
        }

        else if(req.query.action =='delete'){
          if(userSessionInfo.userItems[1].item.itemCode == req.query.itemCode){
            if(userSessionInfo.userItems[1].Status == 'Available'){
              userData.removeItem(userSessionInfo.userItems[1].itemCode)
            res.render('myItems.ejs',{theUser:userSessionInfo});
            }
          }
        }
      }

})

  app.get('/offer*', [
  check('theItem').isAlpha().withMessage('theItem has to be Alpah'),
  check('itemCode').isAlphanumeric().withMessage('itemCode has to be AlphaNumeric'),
  sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{
    const errors = validationResult(req);
    var userSessionInfo= userData.getUserItems(1);
      if (!errors.isEmpty()) {

      res.render('myItems',{theUser:userSessionInfo})

    }
    else{

      var userSessionInfo= userData.getUserItems(1);
    if(req.query.theItem = req.query.itemCode){
      if(userSessionInfo.userItems[1].Status == 'Available'){
        userData.addItem(userSessionInfo.userItems[1].itemCode)
        res.render("mySwaps.ejs",{theUser:userSessionInfo});
      }else{
        //'Sorry,you do not have any available items for swapping. Please add more items to start swapping again!'
        res.render("item.ejs",{theUser:userSessionInfo})
      }
     }
    }
  })

  app.get('/sign*',[
  check('action').isAlpha().withMessage('Action has to be Alpah'),sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {

      res.render('login',{data:"invalid login"})

    }
    else{
    if(req.query.action == 'signIn'){
      res.render('login')
    }else if(req.query.action == 'signout'){
      req.session.destroy;
      res.render('categories.ejs');
    }
  }
  })

  app.get('/login*',function(req,res){
    res.render('login.ejs')

  })

  app.post('/loginInfo*',urlencodedParser,[
  check('password').isEmpty().withMessage('password Cannot be empty'),
  check('Email').isEmail().withMessage('Use normal Email format'),
  sanitizeBody('notifyOnReply').toBoolean()],(req,res)=>{

    var data= userData.getUserItems(1);
    const errors = validationResult(req);
    console.log(errors.array())

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
      console.log('req - '+req.body.Password)
      console.log('req - '+data.user1.emailAdrress)
      //return res.status(422).json({ errors: errors.array() });
      res.render('login.ejs',{data:"invalid login"})

    }
    else{

        console.log('my -'+data)
        console.log('req - '+req.body.Password)

        var genRandomString = function(length){
          return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
          };

          var sha512 = function(password, salt){
          var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
          hash.update(data.user1.password);
          var value = hash.digest('hex');
          return {
              salt:salt,
        passwordHash:value
          };
        };

        function saltHashPassword(userpassword) {
        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = sha512(userpassword, salt);
        console.log('UserPassword = '+userpassword);
        console.log('Passwordhash = '+passwordData.passwordHash);
        console.log('nSalt = '+passwordData.salt);
    }

    saltHashPassword(req.body.Password );
    saltHashPassword(req.body.Password );
        if(req.body.Email == data.user1.emailAdrress & req.body.Password == data.user1.password){
          req.session.theUser = userData.getUserItems(1);
          res.locals.signedInUser=data;
         res.render('myItems.ejs',{theUser:data});

       }else{
         res.render('login.ejs')
        }
   }
  })
