import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedHost, setLoggedHost] = useState(false)
  const [loggedArtist, setLoggedArtist] = useState(false)


  //console.log("user from token ==============>" , user )
  
  const storeToken = (token) => {       //  <==  store in my local storage! console - dev tools
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => { 
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user)

        if(user.isHost){
          setLoggedHost(true)    
          setLoggedArtist(false)     
        }
         else{
          setLoggedArtist(true)
          setLoggedHost(false) 
        }
        
        
        // console.log(loggedHost, "<====== loggedHost")
        // console.log(loggedArtist, "<====== loggedArtist")
      ;        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
   
  const removeToken = () => {                    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
 
  const logOutUser = () => {                   // <== ADD    
    // To log out the user, remove the token
    removeToken();
    setLoggedArtist(false)
    setLoggedHost(false)
    setIsLoggedIn(false)  
    // and update the state variables    
    authenticateUser();
  }


  // function handleTypeOfUser (){
  //  if(user.isHost){
  //     setLoggedHost(true)
  //   }
  //    else{
  //     setLoggedArtist(true)
  //  }
  //  }
  
  useEffect(() => {                                                    
    authenticateUser();
    // handleTypeOfUser ()
  }, []);
 
  return (
    <AuthContext.Provider 
    value={{ isLoggedIn, isLoading, user, loggedHost, loggedArtist,storeToken, authenticateUser, logOutUser}}> {props.children}  </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };