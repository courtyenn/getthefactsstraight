var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Quiz = require('./quiz');
mongoose.connect(process.env.DbUrl);

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));


app.get('/', function(req, res){
  console.log('rendering index');
  res.render('index.html');
});

app.post('/quiz', function(req, res){
  console.log('POSTING...');
  console.log(req.body);
  console.log(req.body.quiz);

  var quiz = new Quiz();
  quiz.game = req.body.quiz;
  quiz.save(function(err, data){
    res.redirect('/quiz/' + data._id);
  });
  // res.render('game.html');
});

app.get('/quiz', function(req, res){
  res.render('index.html');
});

app.get('/quiz/:id', function(req, res){
  console.log('GETTING QUIZ ID', req.params.id);
  Quiz.findOne({_id: req.params.id}, function(err, data){
    if(err){
      res.render('index.html');
    }
    else {
      var game = data.game;
      res.render('game.html', {game: game});
    }
  });

});




app.listen(3000, function(){
  console.log('LISTENING');
});
