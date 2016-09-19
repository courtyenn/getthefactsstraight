var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(__dirname + '/../lib'));

// console.log(cons);
//
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', function(req, res){
  res.render('index.html');
  // res.send(dust.render('base.dust'));
});




app.listen(3000, function(){
  console.log('LISTENING');
});
