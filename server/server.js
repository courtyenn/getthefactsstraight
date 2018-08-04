import React from 'react'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
// import style from '../public/style.css'

import Root from '../src/creation/index'

import Quiz from './quiz'
// import ejs from 'ejs'
mongoose.connect(process.env.DbUrl);

const app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  const content = renderToString(<StaticRouter location={req.url} context={{}}><Root /></StaticRouter>);
  res.send(content);
});

app.get('/quiz', (req, res) => {
  const content = renderToString(<StaticRouter location={req.url} context={{}}><Root /></StaticRouter>);
  res.send(content);
});

app.get('/public/style.css', (req, res) => {
  res.sendFile(path.resolve('./public/style.css'));
});

app.post('/quiz', function(req, res){

  const quiz = new Quiz();
  quiz.game = req.body.quiz;
  quiz.created = Date.now();
  quiz.title = req.body.title;
  // const data = await quiz.save();
  // res.redirect('/quiz/' + data._id);
  // res.render('game.html');
});

app.get('/quiz', function(req, res){
  res.render('index.html');
});

app.get('/quiz/:id', function(req, res){
  console.log('GETTING QUIZ ID', req.params.id);
  Quiz.findOne({_id: req.params.id}, function(err, data){
    // if(err){
    //   res.render('index.html');
    // }
    // else {
      const game = data.game;
      const title = data.title;
      console.log(title);
      res.render('game.html', {game: game, title: data.title});
    // }
  });
});

app.get('/quizzes', function(req, res){
  Quiz.find({}).sort({created: 1}).exec(function(err, data){
    res.render('list.html', {list: data});
  });
});

app.listen(process.env.PORT, function(){
  console.log(`LISTENING ${process.env.PORT}`);
});
