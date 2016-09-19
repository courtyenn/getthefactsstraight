var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  game: String
});

module.exports = mongoose.model('Quiz', quizSchema);
