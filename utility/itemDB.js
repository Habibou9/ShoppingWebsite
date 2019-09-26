var item1 = {itemCode: "shoe1",name:"Caligae", category: "Sandals", desciption1:"Made by romans for their soldiers",description2: "This pair of sandals were made during the Roman time for the roman soldier.There are very strong and the best for any kind of activities. This is one of our special historical pair that is very pricy and own by Roger Smith. The owner of this impressive and exclusive pair bought it at an auction and is willing to swap it or sell it for a high price.",
rate: 4, url: "./ressources/caligae.png"};
var item2 = {itemCode:"shoe2", name:"Geta",category:"Sandals",description1: "An ancient shoe",description2:"This pair of sandals were made during the Roman time for the roman soldier.There are very strong and the best for any kind of activities. This is one of our special historical pair that is very pricy and own by Roger Smith. The owner of this impressive and exclusive pair bought it at an auction and is willing to swap it or sell it for a high price.",rate: 4,url: "./ressources/geta.png"};
var item3 = {itemCode:"shoe3", name:"Flip-Flops", category: "Sandals", description1:"A modern shoe",description2:"FLip FLops are the best for letting the feet breath a little bit. We recomand this for picnics, summer beach trips or during summer traveling time or just stay home relaxing. The material and design for this choose is customizable for you depending on your feet.There is a lot of colors provided for this pair. Don't forget those pairs specially when summer comes.",rate: 5, url:"./ressources/FlipFlop.png"};
var item4 = {itemCode:"shoe4", name:"Biblical sandals", category: "Sandals", description1:"An ancient shoe",description2:"Biblical sandals which are old shoes, are called Tanakhi sandals and Khugistic sandals. This Sandals consist of a sole with two leather ligaments that pass across the foot, and one around the heel.The Biblical sandals are the classic model of leading sandals manufacturers in Israel.",rate: 3,url: "./ressources/Biblical.png"};

var item5 = {itemCode:"shoe5", name:"Oxfords", category: "Dress shoes",description1: "A modern Dress shoe",description2:"This pair is made to stand out during a professional event and be good looking. This type of shoes comes in different colors to give you a wider range of shoes to pick from.",rate: 4, url:"./ressources/Oxford.png"}; 
var item6 = {itemCode:"shoe6", name:"Monk Shoes",category: "Dress shoes",description1: "A modern Dress shoe",description2:"Monk shoes are the type of pair that you want to wear to impress everybody and be unique in a croud of people. This pair is well crafted and hand made in italy by the best. Monk shoes are rare and availble on 2 colors only for us which are black and brown. Polish them everytime before wearing them and they will make sure that the only one everyone notice is you."
,rate:5,url:"./ressources/Monk.png"};
var item7 = {itemCode:"shoe7", name:"Derbies", category: "Dress shoes",description1: "A cute shoes",rate:3 ,description2:"So, Derbies are more common shoes that everybody wear everyday. They are really popular for their simplicity and comfort for people that walk a lot and has to spend they entire day working. For this pair we have a wide range of material and color you can choose from.",url: "./ressources/Derbies.png"};
var item8 = {itemCode:"shoe8", name:"Loafers", category: "Dress shoes",description1: "A confortable shoes",description2:"Loafers are one of the most expensive pair of shoes that we have due to their comfort, their design, and their colors. This pair of shoes will make you the center of the event with the amazing design that it provides. we provide a wide range of colors, design models, and materials for this pair. If you are willing to customize your own pair, just call or email us and we will take care of everything.",rate: 4,url: "./ressources/Loafers.png"};

var item9 = {itemCode:"shoe9", name:"High-tops", category: "Sneakers",description1: "A Shoe for sport",description2:"The high tops we provides are for sport or for style depending on what you want to use them for. The confort of this pair is almost perfect. This pair also come with many colors and can be customize based on your taste",rate:4 ,url: "./ressources/HighTops.png"};
var item10 = {itemCode:"shoe10", name:"Low-tops", category: "Sneakers",description1: "A shoe for normal style",description2:"The Low tops shoes are really comfortable and coloforfull. Its most of the time the go to shoes for teenagers or young adults because its fancy and provide comfort.",rate:3 ,url: "./ressources/LowTops.png"};
var item11 = {itemCode:"shoe11", name:"Mid-cut", category: "Sneakers",description1: "A shoe for any type of events",description2:"Mid Cut shoes are one other way to stand out in a croud but that is less expensive. Come with lot of colors and different material. This is the choice for the young adults that have events or any important events to look professional",rate:4 ,url: "./ressources/MidCut.png"};
var item12 = {itemCode:"shoe12", name:"Slips-on", category: "Sneakers",description1: "A shoe for relaxing",description2:"Slips on look a little bit more like low tops but it have a better material and much better confort thatn low tops. Also the price is a little bit higher than low tops. During summer, there is nothing better than Slips On shoes.",rate:5 ,url: "./ressources/SlipOn.png"};

 var items = function(elements){
   this.elements = elements;
 }

var category1 = {name: 'Sandals', items:[item1, item2, item3,item4]};
var category2 = {name: 'Dress',   items:[item5, item6,item7,item8]};
var category3 = {name: 'Sneaker',   items:[item9, item10,item11,item12]};

var categories = [category1,category2,category3];

var items = [item1, item2, item3,item4,item5, item6,item7,item8,item9, item10,item11,item12]

 module.exports.getItems = function(){
 return categories;
}

module.exports.getItem = function(itemCode){
  for(var i=0; i<items.length; i++){
    if(items[i].itemCode == itemCode){
      return items[i];
    }
  }
}
