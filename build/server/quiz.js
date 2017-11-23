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
  created: Date
})

module.exports = mongoose.model('Quiz', quizSchema)
