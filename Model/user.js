var user= function(userID, firstName, lastName, emailAdrress, address, city, postCode){
  var userOBj = {
    userID: userID,
    firstName: firstName,
    lastName: lastName,
    emailAdrress: emailAdrress,
    address: address,
    city: city,
    postCode: postCode;
  }
  return userOBj;
}

module.export.getUser = user;
