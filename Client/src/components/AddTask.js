import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
 
function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 
  
  const handleSubmit = (e) => {
      e.preventDefault();
 
   // We need the project id when creating the new task
   const {projectId} = props
   const requestBody = { title, description, projectId }

   axios.post(`${API_URL}/api/tasks`, requestBody)
   .then((response)=> {
       setTitle("");
       setDescription("");
       props.refreshProject();
   })
   .catch((error) => console.log(error));
   
}; 

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
 
export default AddTask;