const router = require("express").Router();
const mongoose = require('mongoose');

const Host = require('../models/Host.model');
const Event = require('../models/Event.model')




router.get("/:hostId", (req, res, next) => {
  const { hostId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(hostId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Host.findById(hostId)
  .populate('events')
  .then(host => res.status(200).json(host))
  .catch(error => res.json(error));
});



router.get("/", (req, res, next) => {
  Host.find()
    .populate("events")
    .then((allHosts) => res.json(allHosts))
    .catch((err) => res.json(err));
});

router.post('/', (req, res, next) => {
  const { name, email, password, profilePic, location } = req.body; 

  Host.create({ name, email, password, profilePic, location })
   .then(response => res.json(response)) 
   .catch(err => res.json(err))
});

router.put("/:hostId", (req, res) => {
  Host.findByIdAndUpdate(req.params.hostId, req.body, {new:true}) // { title, description } filtered
    .then((updatedHost) => res.json(updatedHost));
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
