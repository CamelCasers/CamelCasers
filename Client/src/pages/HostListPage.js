import { useEffect, useState } from "react";
import axios from "axios";
import HostCard from "../components/HostCard";
import Search from "../components/Search";




export default function HoststListPage(){


    const storedToken = localStorage.getItem("authToken");
    const [hosts, setHosts] = useState([])
    const [hostsData, setHostData] = useState([])

    function getAllHost() {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/hosts/`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          .then((response) => {
            setHosts(response.data)
            setHostData(response.data)
            
          })
          .catch((error) => console.log(error));
      }
    
      function filterEvents(eventSearch){  

        setHosts(hostsData.slice().filter((elem)=>{return (elem?.name?.toLowerCase().includes(eventSearch?.toLowerCase()))}))
       }
       
       function filterEventsLoc(locSearch){

    
      
        let hostFiltered = hostsData.slice().filter((elem)=>{return (elem?.location?.toLowerCase().includes(locSearch?.toLowerCase()))})

        setHosts(hostFiltered)
        
       }




      useEffect(() => {
        getAllHost();
      }, []);


    return(

        <div className="backgroundGrey centerItemsContainer">
        <Search filterEvents={filterEvents} filterEventsLoc={filterEventsLoc} noMusic={false}/>
            {hosts?.map((host)=>(
                <HostCard key={host._id} {...host} />
            ))}

        </div>

    )
}