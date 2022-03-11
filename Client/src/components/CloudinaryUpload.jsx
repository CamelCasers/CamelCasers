import axios from 'axios';
import React, { useState, useEffect } from 'react'



const CloudinaryUpload = (props) => {
    
    
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dafjdxuov/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'lapqtpcloudinary';


const [image , setImage] = useState()
const [url , setUrl] = useState("")


function uploadImage(e){
  e.preventDefault()
  const formData = new FormData();
  formData.append('file', image);
  formData.append('API_KEY', "551281518892962");
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);



  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json()})
    .then((data) => {
      if (data.secure_url !== '') {
        const uploadedFileUrl = data.secure_url;
        setUrl(uploadedFileUrl);
      }return
    }).then(()=> console.log("image uploaded"))
    .catch(err => console.error(err));
};
useEffect(()=>{
  props.imgUpload(url)

},[url])
// console.log(url)

return (
<div>
<div>
<input type="file" onChange= {(e)=> {
setImage(e.target.files[0])

}}></input>
 <button onClick={uploadImage}>Upload profile Pic</button> 
</div>
<div>
{props.images.map((img)=>(
<img src={img} alt="Profile Pic"/>
))}

</div>
</div>
)
}
export default CloudinaryUpload;