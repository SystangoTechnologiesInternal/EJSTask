var express = require('express');
var router = express.Router();
const itemPerPage = 3;




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Show Items' });
});

//Get items on the basis of type, quantity and pageNo.
router.get('/getItems', function(req, res, next) {

  var itemType   = req.query.type;
  var quantity   = req.query.quantity;
  var pageNo     = req.query.pageNo;
  var itemArray  = generateItem(itemType,quantity);
  let mod        = ((quantity%itemPerPage) > 0)? 1: 0;  
  var totalPages = parseInt(quantity/itemPerPage) + mod;
  var startIndex = (pageNo-1)*itemPerPage;
  var endIndex   = ((pageNo-1)*itemPerPage) + 3;
  
  res.send({itemlist: itemArray.slice(startIndex,endIndex) ,totalPages : totalPages});
});


function generateItem(itemType,quantity,pageNo){
    var itemArray = [];
    
    for(let loop = 0; loop < quantity; loop++){
    	itemArray.push("item"+itemType+(loop+1));
    }

	return itemArray;
}

module.exports = router;
