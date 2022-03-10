const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: String,
  email: String,
  password: String, 
  profilePic: String, 
  location: String, 
  images: [],
  videos: [],
  musicStyle: [], 
  description: String,
  playlist: String,
  isHost: Boolean,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event', default: []}],  
});

module.exports = model('Artist', artistSchema);


