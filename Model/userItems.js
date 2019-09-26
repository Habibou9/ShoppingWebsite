var userItem= function(userID, userItem, rating, Status, swapItem, swapItemRating, swapperRating){
  var itemOBj = {
    userID: userID,
    userItem: userItem,
    rating: rating,
    Status: Status,
    swapItem: swapItem,
    swapItemRating: swapItemRating,
    swapperRating: swapperRating;
  }
  return itemOBj;
}

module.export.getUser = userItem;
