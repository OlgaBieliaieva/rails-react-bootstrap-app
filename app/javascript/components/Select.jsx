import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Select = ({ data, label, name, onSelect }) => {
  const [searchParams, _] = useSearchParams();
  const [targetValue, setTargetValue] = useState("All");

  useEffect(() => {
    if (name === "area") {
      const area = searchParams.get("area");
      setTargetValue(area ?? "All")
    } else {
      const ingredient = searchParams.get("ingredient");
      setTargetValue(ingredient ?? "All")
    }
  },[])

  const handleChange = (e) => {
    e.preventDefault();

    setTargetValue(e.target.value);

    onSelect(
      e.target.name,
      e.target.options[e.target.selectedIndex].id,
      e.target.value
    );
  };

  const allData = data?.map((item, index) => (
    <option
      key={index}
      value={item.name}
      id={`${item.db_id ? item.db_id : item.id}`}
    >
      {item.name}
    </option>
  ));

  return (
    <div className="form-floating">
      <select
        className="form-select"
        id="floatingSelect"
        value={targetValue}
        name={name}
        onChange={handleChange}
      >
        <option value="All">All</option>
        {data?.length > 0 && allData}
      </select>
      <label htmlFor="floatingSelect">{label}</label>
    </div>
  );
};
export default Select;
