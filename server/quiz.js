var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Column = {
  title: String,
  value: String,
  id: String
};
let Choice = {
  title: String,
  value: String,
  id: String,
  correctId: String
};

var quizSchema = new Schema({
  title: String,
  game: String,
  columns: [Column],
  choices: [Choice],
  created: Date
});

module.exports = mongoose.model('Quiz', quizSchema);
