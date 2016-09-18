var express = require('express');
var path = require('path');
var dust = require('express-dustjs');

var app = express();

app.engine('dust', dust.engine({
  // Use dustjs-helpers
  useHelpers: true
}));
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', function(req, res){
  res.render('index');
  // res.send(dust.render('base.dust'));
});


app.listen(3000, function(){
  console.log('LISTENING');
});
