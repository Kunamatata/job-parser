import React from "react";

function Search(props) {
  return (
    <input
      className="search"
      disabled= {props.isDisabled}
      type="text"
      onChange={e => {
        props.handleChange(e.target.value);
      }}
      placeholder={props.placeholder}
    />
  );
}

export default Search;
