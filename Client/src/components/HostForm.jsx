import Form from "react-bootstrap/Form";
import * as Bootstrap from "react-bootstrap"

export default function HostForm() {
  return (
    
    <div className="EditProjectPage">
      <h3>Edit your Host Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
         
         <button onClick={deleteProject}>Delete</button>
       
    




      <Bootstrap.Form>
        <fieldset disabled>
          <Bootstrap.Form.Group className="mb-3">
            <Bootstrap.Form.Label htmlFor="disabledTextInput">Disabled input</Bootstrap.Form.Label>
            <Bootstrap.Form.Control id="disabledTextInput" placeholder="Disabled input" />
          </Bootstrap.Form.Group>
          <Bootstrap.Form.Group className="mb-3">
            <Bootstrap.Form.Label htmlFor="disabledSelect">
              Disabled select menu
            </Bootstrap.Form.Label>
            <Bootstrap.Form.Select id="disabledSelect">
              <option>Disabled select</option>
            </Bootstrap.Form.Select>
          </Bootstrap.Form.Group>
          <Bootstrap.Form.Group className="mb-3">
            <Bootstrap.Form.Check
              type="checkbox"
              id="disabledFieldsetCheck"
              label="Can't check this"
            />
          </Bootstrap.Form.Group>
          <Bootstrap.Button type="submit">Submit</Bootstrap.Button>
        </fieldset>
      </Bootstrap.Form>
    </div>
  );
}
