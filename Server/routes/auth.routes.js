const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Artist = require("../models/Artist.model");
const Host = require("../models/Host.model");
 
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const ArtistModel = require("../models/Artist.model");
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.json("Todo bien por aquí")
})

router.post('/signup', (req, res, next) => {
  const { email, password, name , isHost} = req.body;
 
  // Check if email or password or name are provided as empty string 
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
 
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  /* const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }*/
 if(isHost){
  Host.findOne({ email })
  .then((foundHost) => {
    if (foundHost) {
      res.status(400).json({ message: "Host already exists." });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    // We return a pending promise, which allows us to chain another `then` 
    return Host.create({ email, password: hashedPassword, name , isHost});
  })
  .then((createdUser) => {
    // Deconstruct the newly created user object to omit the password
    // We should never expose passwords publicly
    const { email, name, _id , isHost } = createdUser;
  
    // Create a new object that doesn't expose the password
    const user = { email, name, _id , isHost};

    // Send a json response containing the user object
    res.status(201).json({ user: user });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
  })
 } else{
   Artist.findOne({ email })
     .then((foundUser) => {
       if (foundUser) {
         res.status(400).json({ message: "Artist already exists." });
         return;
       }
  
       const salt = bcrypt.genSaltSync(saltRounds);
       const hashedPassword = bcrypt.hashSync(password, salt);
  
       // Create the new user in the database
       // We return a pending promise, which allows us to chain another `then` 
       return Artist.create({ email, password: hashedPassword, name , isHost});
     })
     .then((createdUser) => {
       // Deconstruct the newly created user object to omit the password
       // We should never expose passwords publicly
       const { email, name, _id , isHost } = createdUser;
     
       // Create a new object that doesn't expose the password
       const user = { email, name, _id , isHost};
  
       // Send a json response containing the user object
       res.status(201).json({ user: user });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Internal Server Error" })
     }); 
 }
});
   
   
   
  // POST  /auth/login
  router.get('/login', (req, res, next) => {
    res.json("Todo bien por aquí")
  })

  router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
   

    Host.findOne({ email })
      .then((foundHost) => {
      
        if (!foundHost) {
          Artist.findOne({email})
            .then((foundArtist)=>{
              if(!foundArtist){
                res.status(400).json({message: "User not found"})
                return

              }else{
                const passwordCorrect = bcrypt.compareSync(password, foundArtist.password);
   
                if (passwordCorrect) {
                  const { _id, email, name } = foundArtist;
        
                  const payload = { _id, email, name };
        
                  const authToken = jwt.sign( 
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                  );
          
                  res.status(200).json({ authToken: authToken })
                  
                }
                else {
                  res.status(401).json({ message: "Unable to authenticate the Artist" })
                }
           
              }})
              .catch(err => res.status(500).json({ message: "Internal Server Error" }))
       
              } else{
                const passwordCorrect = bcrypt.compareSync(password, foundHost.password);
   
                if (passwordCorrect) {
                  const { _id, email, name } = foundHost;
        
                  const payload = { _id, email, name };
        
                  const authToken = jwt.sign( 
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                  );
          
                  res.status(200).json({ authToken: authToken });
                }
                else {
                  res.status(401).json({ message: "Unable to authenticate the Host" });
                }
           
              }})
              .catch(err => res.status(500).json({ message: "Internal Server Error" }))
          })

       
   
   
  // GET  /auth/verify
  router.get('/verify', isAuthenticated, (req, res, next) => {     
 
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);
   
    // Send back the object with user data
    // previously set as the token payload
    res.status(200).json(req.payload);
  });



module.exports = router;
