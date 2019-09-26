<--var router = express.Router();
var categories= require('./Model/category');
var appUtil = require('../utility/appUtil');

router.get('/', function(req, res, next) {

    var page= {
        title:'Home',
        path: req.url
    }

  res.render('index', { title: page});
});-->
