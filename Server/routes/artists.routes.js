const router = require("express").Router();
const mongoose = require('mongoose');

const Artist = require('../models/Artist.model');
const Event = require('../models/Event.model')

router.get("/", (req, res, next)=> {
    res.json("testing Get on server")
})

router.post('/', (req, res, next) => {
  const { name, email, password, profilePic, location, images, videos, musicStyle, descripcion, playlist } = req.body; 

  Artist.create({ name, email, password, profilePic, location, images, videos, musicStyle, descripcion, playlist })
   .then(response => res.json(response)) 
   .catch(err => res.json(err))
});

router.put("/:artistId", (req, res) => {
  Artist.findByIdAndUpdate(req.params.artistId, req.body, {new:true}) // { title, description } filtered
    .then((updatedArtist) => res.json(updatedArtist));
  /*  Task.findById(req.params.taskId).then((task) => {
    const oldProject = task.project;
    const newProject = req.body.project;
    Project.findByIdAndUpdate(oldProject, { $pull: { tasks: task._id } }).then(
      (_) => {
        Project.findByIdAndUpdate(newProject, { $push: { tasks: task._id } });
      }
    );
    const { title, description} = req.body
    task.title = title
    task.description = description;
    task.save().then((updatedTask) => res.json(updatedTask));
  });
  // delete from old project .then()
  // $push to new project */
});

module.exports = router;
