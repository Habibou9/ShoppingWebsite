var item= function(itemCode, name, category, description, rate, url{
  var itemOBj = {
    itemCode: itemCode,
    name: name,
    category: category,
    description: description,
    rate: rate,
    url: url;
  }
  return itemOBj;
}

module.export.getItem = item;
