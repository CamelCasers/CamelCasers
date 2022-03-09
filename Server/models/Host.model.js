const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const hostSchema = new Schema({
  name: String,
  email: String,
  password: String, 
  profilePic: String,
  location: String, 
  events: [{ type: Schema.Types.ObjectId, ref: 'Event', default: []}],  
});

module.exports = model('Host', hostSchema);

