const router = require("express").Router();
const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

router.get("/tasks", (req, res, next)=> {
    res.json("Va bien")
})

router.post('/tasks', (req, res, next) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then(newTask => {
      return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err))
});

router.put("/:taskId", (req, res) => {
  delete req.body.project; // const { title, description } = req.body;
  Task.findByIdAndUpdate(req.params.taskId, req.body) // { title, description } filtered
    .then((updatedTask) => res.json(updatedTask));
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
