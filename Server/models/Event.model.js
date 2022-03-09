const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: String,
  date: Date,
  location: String, 
  images: [],
  videos: [],
  musicStyle: [], 
  descripcion: String,
  timeRange: String,
  equiptment: [],
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist', default: []}],  
  host: { type: Schema.Types.ObjectId, ref: 'Host', default: {}},  
});

module.exports = model('Event', eventSchema);

