import axios from "axios";
import { useEffect, useRef, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navigate, useNavigate } from "react-router-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_TOKEN;


export default function MapPage(props){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const elemRef = useRef(null);
    const [lng, setLng] = useState(2.184007);
    const [lat, setLat] = useState(41.390205);
    const [zoom, setZoom] = useState(12);
    const navigate = useNavigate();
    
   

    axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.location}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`
    )
    .then((response) => {
        console.log(response.data)
        const lat= response.data.features[0].center[0];
        const long= response.data.features[0].center[1];
        const address= response.data.features[0].place_name

        console.log(lat, long)
        setLng(lat)
        setLat(long)
        

        const marker= new mapboxgl.Marker({element: elemRef.current})
                        .setLngLat([lat, long])
                       
                        // .setPopup(new mapboxgl.Popup().setHTML(`                      
                        // Address:
                        // <br/>
                        // ${address}</p>
                        // `))
                        .addTo(map.current)
                       

    })

   

    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });        
      
        
    },[]);


    
     
    
    console.log("7777777777777////////////////",lng, lat)

    return(
        <div>
            <h1>Event Location</h1>
            <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
            <div ref={mapContainer} className="map-container" /> 
            
        </div>
    )
}