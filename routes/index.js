var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

/* Mongo Connection*/
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://user:Bi6KX3u717NiJPZG@mjocampov-kchmz.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

var db = undefined;
var history = undefined;

client.connect((err) => {
  if(err) throw err;

  console.log('Conectado a monguito!');

  db = client.db('DatosGov');
  history = db.collection('History');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET history*/
function getHistory(fnCBK, errCBK) {
   history.find({})
    .toArray((err, data) => {
      if(err) {
        errCBK(err);
        return;
      }

      fnCBK(data);
    });
}

router.get('/history', (req, res) => {

  function fnCBK(data) {
    res.send(data);
  }

  function errCBK(err) {
    res.send(err);
  }

  getHistory(fnCBK, errCBK);
});

/*POST */
function postLink(new_link, fnCBK, errCBK) {
  history.insertOne(new_link, (err,res) => {
    if(err) {
      errCBK(err);
      return;
    }

    console.log(new_link+'inserted');
    fnCBK('Usuario agregado con exito');
  });
}

router.post('/history', (req, res) => {

  var new_link =req.body.link;

  function fnCBK(data) {
    res.send(data);
  }

  function errCBK(err) {
    res.send(err);
  }

  postLink(new_link, fnCBK, errCBK);
});

module.exports = router;
