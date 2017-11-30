process.env.DbUrl = process.env.DbUrl ? process.env.DbUrl : 'mongodb://localhost:27017/facts'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import Quiz from './quiz'
import ejs from 'ejs'
import mcache from 'memory-cache'
mongoose.connect(process.env.DbUrl)

let app = express()
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')
app.set('views', './static/views')

app.post('/quiz', (req, res) => {

    if (req.query.json) {
        let quiz = new Quiz()
        quiz.game = req.body.quiz
        quiz.createdDate = Date.now()
        quiz.title = req.body.title
        quiz.save((err, data) => {
            res.redirect('/quiz/' + data._id)
        })
    }
    else {
        let quiz = new Quiz()
        quiz.columns = req.body.columns
        quiz.choices = req.body.choices
        quiz.createdDate = Date.now()
        quiz.title = req.body.title
        quiz.save((err, data) => {
            if(data && data._id) {
                res.json({redirect: '/quiz/'+data._id})
            }
            else {
                res.redirect('/')
            }
        })
    }
})

app.post('/answer', (req, res) => {
    res.json(mcache.get(req.body.answerId) === req.body.columnId)
})

app.get('/quiz/:id', (req, res) => {
    console.log('GETTING QUIZ ID', req.params.id)
    Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        let game
        let title

        if(quiz) {
            let title = quiz.title
            if (quiz) {
                game = quiz
            }
            else {
                game = JSON.stringify({columns: quiz.columns, choices: quiz.choices})
            }

            quiz.choices.forEach(answer => {
                mcache.put(answer.id, answer.correctId)
                delete answer.correctId
            })
        }

        res.json({game, title});

    }).lean()
})

app.get('/quizzes', (req, res) => {
    Quiz.find({}).lean().sort({ createdDate: 1 }).exec(function (err, data) {
        let quizzes = []
        quizzes = data.map(quiz => {
            if(quiz.possibleStars > 0) {
                quiz.topRated = quiz.totalStars / quiz.possibleStars
            }
            else {
                quiz.topRated = 0
            }
            return quiz
        })
        res.json({ games: quizzes })
    })
})

app.get('*', (req, res) => {
    res.render('index.html')
})


app.listen(3006, () => {
    console.log('LISTENING ')
})
