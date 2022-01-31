import React from "react";

const FilterBar = (props) => {
  const {showMode, handleSwitch, handleKeyPress, handleChange, searchStr} = props;

  return (
    <div className="row">
      <input  className="col-6" type="text" placeholder="Search..." onKeyPress={handleKeyPress} onChange={(event)=>handleChange(event)} value={searchStr}/>
      <label className="p-switch col-6">
        <input type="checkbox" className="p-switch__input" onChange={handleSwitch} checked={showMode}/>
        <span className="p-switch__slider"></span>
        <span className="p-switch__label">{showMode ? "Switch To Song" : "Switch To Album"}</span>
      </label>
    </div>
  );
};

export default FilterBar;
