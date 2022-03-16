import { useState } from "react";

function Search(props) {
  const [search, setSearch] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [searchStyle, setSearchStyle] = useState([]);

  function handleSelect(event) {
    const search = event.target.value;
    setSearch(search);

    props.filterEvents(search);
  }
  function handleSelect1(event) {
    const searchLoc = event.target.value;
    setSearchLoc(searchLoc);
    props.filterEventsLoc(searchLoc);
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
    props.filterEventsMusic(value);
  };

  return (
    <>
      <div className="container">
        <div class="row">
          <div className="col input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Filter by Name"
              aria-label=".form-control-sm example"
              aria-describedby="inputGroup-sizing-sm"
              value={search}
              onChange={handleSelect}
            />
          </div>
          <div className="col input-group input-group-sm mb-3">

            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Filter by Location"
              aria-label=".form-control-sm example"
              aria-describedby="inputGroup-sizing-sm"
              value={searchLoc}
              onChange={handleSelect1}
            />
          </div>
        </div>

        <div>
          {props.noMusic && (
            <>
              <select
                className="form-select form-select-sm"
                aria-label="Filter by Music Style"
                type="text"
                name="musicStyles"
                value={searchStyle}
                onChange={handleSelect2}
              >
                <option selected>Filter By Music Style</option>
                <option value="rock">Rock</option>
                <option value="reggae">Reggae</option>
                <option value="pop">Pop</option>
                <option value="romantic">Romantic</option>
                <option value="party">Party</option>
                <option value="swing">Swing</option>
                <option value="heavy">Heavy</option>
                <option value="chill">Chill</option>
                <option value="classic">Classic</option>
                <option value="jazz">Jazz</option>
                <option value="others">Others</option>
              </select>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
