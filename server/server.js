import bodyParser from 'body-parser'
import ejs from 'ejs`'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import Quiz from './`quiz'

mongoose.connect(process.env.DbUrl);
const app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('game.html');
});

app.post('/quiz', (req, res) => {
  const quiz = new Quiz();
  quiz.game = req.body.quiz;
  quiz.created = Date.now();
  quiz.title = req.body.title;
  quiz.save(function(err, data){
    res.redirect('/quiz/' + data._id);
  });
});

app.get('/quiz', function(req, res){
  res.render('index.html');
});

app.get('/quiz/:id', function(req, res){
  console.log('GETTING QUIZ ID', req.params.id);
  Quiz.findOne({_id: req.params.id}, (err, data) => {
      const game = data.game;
      const title = data.title;
      console.log(title);
      res.render('game.html', {game: game, title: data.title});
  });
});

app.get('/quizzes', function(req, res){
  Quiz.find({}).sort({created: 1}).exec(function(err, data){
    res.render('list.html', {list: data});
  });
});


app.listen(3001, () => {
  console.log('LISTENING ');
});
