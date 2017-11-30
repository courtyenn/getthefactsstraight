import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Column = {
    title: String,
    value: String,
    id: String
}
let Choice = {
    title: String,
    value: String,
    id: String,
    correctId: String
}

let quizSchema = new Schema({
    title: String,
    game: String,
    columns: [Column],
    choices: [Choice],
    createdDate: Date,
    popularity: {type: Number, default: 0},
    possibleStars: {type: Number, default: 0},
    totalStars: {type: Number, default: 0}
})

module.exports = mongoose.model('Quiz', quizSchema)
