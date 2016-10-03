var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  title: String,
  game: String,
  created: Date
});

module.exports = mongoose.model('Quiz', quizSchema);
