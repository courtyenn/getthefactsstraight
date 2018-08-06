import React from 'react'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import routes from '../src/creation/routes'
import AppStore from '../src/creation/AppStore'
import {Provider} from 'react-redux'

import Quiz from './quiz'
mongoose.connect(process.env.DbUrl);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  let context = {}
  const content = renderToString(<Provider store={AppStore}><StaticRouter location={req.url} context={context}>{renderRoutes(routes)}</StaticRouter></Provider>);
  const html = `
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Get The Facts Straight!</title>
      <link rel="stylesheet" href="styles.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0,
    maximum-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="client-bundle.js"></script>
    </body>
  </html>`
  
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
  }
  res.send(html);
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
