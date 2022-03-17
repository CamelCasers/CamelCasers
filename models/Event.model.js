const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: String,
  date: Date,
  location: String, 
  images: [],
  videos: [],
  musicStyle: [], 
  description: String,
  timeRange: String,
  equipment: [],
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist', default: []}],  
  pendingArtists: [{ type: Schema.Types.ObjectId, ref: 'Artist', default: []}],  
  host: { type: Schema.Types.ObjectId, ref: 'Host', default: {}}
});

module.exports = model('Event', eventSchema);

