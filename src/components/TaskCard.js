// src/components/TaskCard.js
 
// We are deconstructing the props object directly in the parentheses of the function
function TaskCard({ title, description }) {
    return (
      <div className="TaskCard card">
        <h3>Task name: {title}</h3>
        <h4>Description: {description}</h4>
      </div>
    );
  }
   
  export default TaskCard