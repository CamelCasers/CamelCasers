const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Event = require("../models/Event.model");
const Artist = require("../models/Artist.model");
const Host = require("../models/Host.model");


router.post("/reject", (req, res, next) => {
  
  const { artistId, eventId} = req.body;
  console.log("back artist",artistId,"back event", eventId);
    Event.findByIdAndUpdate(eventId,  {$pull: {artists: artistId}}, {new: true})
    .then(() => {Artist.findByIdAndUpdate(artistId, {$pull: {events: eventId}}, {new: true})
    .then((updatedArtist)=>{res.json(updatedArtist)}).catch((err) => res.json(err))})      
    .catch((err) => res.json(err))
  })

router.put("/reject", (req, res, next) => {
  
  const { artistId, eventId} = req.body;
  console.log("back artist",artistId,"back event", eventId);
    Event.findByIdAndUpdate(eventId,  {$pull: {pendingArtists: artistId}}, {new: true})
    .then(() => Artist.findByIdAndUpdate(artistId, {$pull: {pendingEvents: eventId}}, {new: true})
    .then((updatedArtist)=>{res.json(updatedArtist)}).catch((err) => res.json(err)))      
    .catch((err) => res.json(err))
  })


router.put("/decide", (req, res, next) => {

 // console.log("//////////////////////// forrrrrrrrooooooooooo")
  
  const { artistId, eventId} = req.body;

 
    Event.findByIdAndUpdate(eventId,  {$pull: {pendingArtists: artistId._id}}, {new: true})
    .then((newEvent)=>{
     // console.log("after pull event >>>>>>>>>",newEvent);

      Event.findByIdAndUpdate(eventId,  {$push: {artists: artistId._id}}, {new: true})
      .then((newEvent1)=>{
      //  console.log("after push event >>>>>>>>>",newEvent1)
        Artist.findByIdAndUpdate(artistId._id,   {$pull: {pendingEvents: eventId}}, {new: true})
        .then((art)=>{
         // console.log("after pull artist  >>>>>>>>>",art)

          Artist.findByIdAndUpdate(artistId._id,  {$push: {events: eventId}}, {new: true})
          .then((updatedArtist)=>{
           // console.log("after push artist  >>>>>>>>>",updatedArtist)
            res.json(newEvent1)})
            .catch((err) => res.json(err))
        })
      })
    })
    .catch((err) => res.json(err))
  })      
  

router.post("/decide", (req, res, next) => {
  
  const { artistId, eventId} = req.body;
  //console.log("back artist",artistId,"back event", eventId);
    Event.findByIdAndUpdate(eventId,  {$pull: {pendingArtists: artistId}}, {new: true})
    .then(() => {Artist.findByIdAndUpdate(artistId, {$pull: {pendingEvents: eventId}}, {new: true})
    .then((updatedArtist)=>{res.json(updatedArtist)}).catch((err) => res.json(err))})      
    .catch((err) => res.json(err))
  })



router.put("/join", (req, res, next) => {
  
  const { artistId, eventId} = req.body;
  
        Event.findByIdAndUpdate(eventId,  {$push: {pendingArtists: artistId}}, {new: true})
    .then((updatedEvent) => {Artist.findByIdAndUpdate(artistId,  {$push: {pendingEvents: eventId}}, {new: true})
    .then((updatedArtist)=>{res.json(updatedArtist)}).catch((err) => res.json(err))})      
    .catch((err) => res.json(err))
  })

router.get("/", (req, res, next) => {
  Event.find()
    .populate("host")
    .then((allEvents) => res.json(allEvents))
    .catch((err) => res.json(err));
});

router.post("/", (req, res, next) => {


  const { title, date, location, images, videos, musicStyle, description, timeRange, equiptment, user } = req.body;
  const host = user._id
  

  Event.create({ title, date, location, images, videos, musicStyle, description, timeRange, equiptment, host})
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
  .populate("pendingArtists")
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
