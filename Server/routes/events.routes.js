const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Event = require("../models/Event.model");
const Artist = require("../models/Artist.model");
const Host = require("../models/Host.model");

router.get("/", (req, res, next) => {
  Event.find()
    .populate("host")
    .then((allEvents) => res.json(allEvents))
    .catch((err) => res.json(err));
});

router.post("/:hostId", (req, res, next) => {

 const {hostId}= req.params
  const { title, date, location, images, videos, musicStyle, description, timeRange, equiptment } = req.body;
  

  Event.create({ title, date, location, images, videos, musicStyle, description, timeRange, equiptment, host: hostId })
    .then((newEvent) => {
      Host.findByIdAndUpdate(host,  {$push: {events: newEvent}})
    .then((__) => res.json(newEvent))
    })
    .catch((err) => res.json(err));
});

router.get("/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findById(eventId)
  .populate('artists')
  .populate('host')
  .then(event => res.status(200).json(event))
  .catch(error => res.json(error));
});

router.put('/:eventId', (req, res, next) => {
  const { eventId } = req.params;
 
 /* if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }*/
 
  Event.findByIdAndUpdate(eventId, req.body, { new: true })
    .then((updatedEvent) => res.json(updatedEvent))
    .catch(error => res.json(error));
});


router.delete('/:eventId', (req, res, next) => {
  const { eventId } = req.params;
  
 /* if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }*/
 
  Event.findByIdAndDelete(eventId)
    .then(() => res.json({ message: `Project with ${eventId} is removed successfully.` }))
    .catch(error => res.json(error));
});

module.exports = router;
