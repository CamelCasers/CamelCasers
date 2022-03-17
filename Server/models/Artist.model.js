const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: String,
  email: String,
  password: String, 
  profilePic: {
    type: String,
    default:"https://cdn-icons-png.flaticon.com/512/456/456212.png"}, 
  location: String, 
  images: [],
  videos: [],
  musicStyle: [], 
  description: String,
  playlist: String,
  isHost: Boolean,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event', default: []}],
  pendingEvents:[{ type: Schema.Types.ObjectId, ref: 'Event', default: []}],
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat', default: []}] 
});

module.exports = model('Artist', artistSchema);


