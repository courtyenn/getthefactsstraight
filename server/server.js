var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Quiz = require('./quiz');
var ejs = require('ejs');
let mcache = require('memory-cache')
mongoose.connect(process.env.DbUrl);

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', function (req, res) {
  console.log('rendering index');
  res.render('game.html');
});

app.post('/quiz', function (req, res) {
  console.log('POSTING...');
  console.log(req.body);
  console.log(req.body.quiz);

  if (req.query.json) {
    var quiz = new Quiz();
    quiz.game = req.body.quiz;
    quiz.created = Date.now();
    quiz.title = req.body.title;
    quiz.save(function (err, data) {
      res.redirect('/quiz/' + data._id);
    });
  }
  else {
    var quiz = new Quiz();
    quiz.columns = req.body.columns;
    quiz.choices = req.body.choices;
    quiz.created = Date.now();
    quiz.title = req.body.title;
    quiz.save(function (err, data) {
      res.redirect('/quiz/' + data._id);
    });
  }

  // res.render('game.html');
});

app.post('/answer', (req, res) => {
    res.json(mcache.get(req.body.answerId) === req.body.columnId);
});

app.get('/quiz', function (req, res) {
  res.render('create.html');
});

app.get('/quiz/:id', function (req, res) {
  console.log('GETTING QUIZ ID', req.params.id);
  Quiz.findOne({ _id: req.params.id }, function (err, quiz) {
    let game;
    var title = quiz.title;
    if (quiz.game) {
      game = quiz.game;
    }
    else {
      game = JSON.stringify({ columns: quiz.columns, choices: quiz.choices });
    }
    quiz.choices.forEach(answer => {
        mcache.put(answer.id, answer.correctId);
        delete answer.correctId;
    });

    console.log(title);
    res.render('game.html', { game, title });
  });
});

app.get('/quizzes', function (req, res) {
  Quiz.find({}).sort({ created: 1 }).exec(function (err, data) {
    res.render('list.html', { list: data });
  });
});

app.listen(3000, function () {
  console.log('LISTENING ');
  console.log(arguments);
});
