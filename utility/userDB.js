var itemData = require('../utility/itemDB');
var userData = require('/Users/habibmda/Desktop/MyApp-23-5/utility/userDB.js');

var user1 = {UserID: 1, firstName:"Martin", lastName:"gamble", emailAdrress:"mart@yahoo.com", password:"user1", address:"5514 rajon rd",  city:"Seattle", state:"DC", postCode:"46533", country:"USA"};
var user2 = {UserID: 2, firstName:"Sandra", lastName:"Blake", emailAdrress:"sanlove@gmail.com", password:"user2",address:"654 turner dr",  city:"San Francisco", state:"CA", postCode:"32098", country:"USA"};

var userItem1 = {item: itemData.getItem('shoe1'),rating: 5, Status:"Swapped", swapItem:"",swapItemRating:"4",swapperRating:"2"};

var userItem2 = {item: itemData.getItem('shoe2'),rating: 2, Status:"Available",swapItem:"",swapItemRating:"3",swapperRating:"4"};

var userItem3 = {item: itemData.getItem('shoe3'),rating: 1, Status:"available",swapItem:"",swapItemRating:"4",swapperRating:"5"};
var userItem4 = {item: itemData.getItem('shoe4'),rating: 3, Status:"swapped",swapItem:"",swapItemRating:"5",swapperRating:"4"};

var userProfile1 = {UserID:user1.UserID, user1, userItems: [userItem1, userItem2]};
var userProfile2 = {UserID:user2.UserID, user:user2, userItems: [userItem3, userItem4]};

var userProfile = [userProfile1,userProfile1];

var users = function(elements){
  this.elements = elements;
}

var users = [user1,user2];

module.exports.getUsers = function(){
return users;
}

module.exports.getUser = function(UserID){
  for(var i=0;i<users.length; i++){
    if(users[i].UserID == UserID){
      return users[i];
    }
  }
}

module.exports.getUserItems = function(UserID){
  for(var i=0;i<userProfile.length; i++){
    if(userProfile[i].UserID == UserID){
      return userProfile[i];
      console.log(userProfile[i])
    }
  }
}

module.exports.removeItem = function(itemCode){
  for(var i=0;i<userProfile.userItems.length; i++){
    if(userProfile.userItems[i].itemCode == itemCode){
      userProfile.userItems.splice(i,1)
      return userProfile;
      console.log(userProfile[i])
    }
  }
}

module.exports.addItem = function(itemCode){
  for(var i=0;i<userProfile.userItems.length; i++){
    if(userProfile.userItems[i].itemCode == itemCode){
      userProfile.userItems.push(i)
      return userProfile;
      console.log(userProfile[i])
    }
  }
}

module.exports.getUserProfiles = function(){
return userProfile;
}
