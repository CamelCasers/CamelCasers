import { useState } from "react";

function Search(props) {

  const [search, setSearch] = useState("")
  const [searchLoc, setSearchLoc] = useState("")
  const [searchStyle, setSearchStyle] = useState([])


  function handleSelect(event){
   const search = event.target.value
   setSearch(search)

   props.filterEvents(search)
  }
  function handleSelect1(event){
   const searchLoc = event.target.value
   setSearchLoc(searchLoc)
   props.filterEventsLoc(searchLoc)
  }
  // function handleSelect3(event){
  //  const searchStyle = event.target.value
  //  setSearchStyle(searchStyle)
  //  props.filterEventsMusic(searchStyle)
  // }
  const handleSelect2 = (e) => {
    var option = e.target.options;
    var value = [];
    
    for (var i = 0, l = option.length; i < l; i++) {
      if (option[i].selected) {
        value.push(option[i].value);
      }
    }

    setSearchStyle(value);
    props.filterEventsMusic(value)
  };
 
  return (
    <div className="filterEvents">
      <label>Sort by name: </label>
      <input name="searchName" type="text" value={search} onChange={handleSelect}/>
      <label>Sort by location: </label>
      <input name="searchName" type="text" value={searchLoc} onChange={handleSelect1}/>
      {props.noMusic && <>
      <label>Sort by Music style: </label>
      <select
              className="form-select"
              multiple={true}
              type="text"
              name="musicStyles"
              value={searchStyle}
              onChange={handleSelect2}
            >
              <option value="rock">Rock</option>
              <option value="reggae">Reggae</option>
              <option value="Pop">Pop</option>
              <option value="romantic">Romantic</option>
              <option value="party">Party</option>
              <option value="swing">Swing</option>
              <option value="heavy">Heavy</option>
              <option value="chill">Chill</option>
              <option value="classic">Classic</option>
              <option value="jazz">Jazz</option>
              <option value="others">Others</option>
            </select>
      </>}
    </div>
  );
}

export default Search;
