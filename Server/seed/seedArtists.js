const saltRounds = 10;
const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");


const Artist = require("../models/Artist.model")
const artistSeed = require("../seed/artistSeed.json")



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



  Artist.deleteMany()
  .then(()=>{

    artistSeed.forEach((artist)=>{
  
      // console.log(artist);
      
      let salt = bcrypt.genSaltSync(saltRounds);
      
      let password = bcrypt.hashSync(artist.password, salt)
      
      let name = artist.name
      let email = artist.email    
      let profilePic = artist.profilePic
      let location = artist.location
      let images =  artist.images
      let videos =  artist.videos
      let musicStyle =    artist.musicStyle
      let description =     artist.description
      let playlist = artist.playlist
      let isHost = artist.isHost
      
      
      
      Artist.create({name: name, email: email, password:password, profilePic:profilePic, location:location, images:images, videos:videos, musicStyle:musicStyle, description:description, playlist:playlist, isHost:isHost})
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
      })
  })  
    






