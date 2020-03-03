const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  userid: {type: Schema.Types.ObjectId, ref: 'User'},
  category: { type: String},
  title: {type: String, required: true},
  genre: { type: String},
  rated: { type: String},
  year: { type: Number},
  plot: { type: String},
  runtime: { type: String},
  poster: { type: String},
  comments: { type: String},
  emojiText: { type: String},
  emojiUrl: { type: String},
  rating: {type: String},
  ratingrt: {type: String}
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;