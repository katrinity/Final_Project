const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareableLinkSchema = new Schema({
  link: {type: String},
  userid: {type: Schema.Types.ObjectId, ref: 'User'},
  movieid: { type: Schema.Types.ObjectId, ref: 'Movie'},
  category: {type: String}
});

const ShareableLink = mongoose.model("ShareableLink", shareableLinkSchema);

module.exports = ShareableLink;