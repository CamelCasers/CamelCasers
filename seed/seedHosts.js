const saltRounds = 10;
const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");


const Host = require("../models/Host.model")
const hostSeed = require("./hostSeed.json")



mongoose
  .connect("mongodb+srv://Miki:ironhack@cluster0.lpnm2.mongodb.net/camelCasers?retryWrites=true&w=majority")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });



  Host.deleteMany() 
  .then(()=>{
    
    hostSeed.forEach((host)=>{
  
      
      
      let salt = bcrypt.genSaltSync(saltRounds);
      
      let password = bcrypt.hashSync(host.password, salt)
      
      let name = host.name
      let email = host.email    
      let profilePic = host.profilePic
      let location = host.location
      let description = host.description
      let events = host.events
      let isHost = host.isHost
      
      
      
      Host.create({name: name, email: email,password:password, profilePic:profilePic, location:location, description:description, events:events, isHost:isHost})
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
      })
  })  
    






