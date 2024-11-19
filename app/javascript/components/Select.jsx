import React, { useState, useEffect, useRef } from "react";

const Select = ({ data }) => {
  //   const [areas, setAreas] = useState("");

  //   useEffect(() => {
  //     const url = `/api/v1/areas/index`;
  //     fetch(url)
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         throw new Error("Network response was not ok.");
  //       })
  //       .then((res) => setAreas(res))
  //       .catch(() => navigate("/"));
  //   }, []);

  const allData = data.map((item, index) => (
    <option key={index} value={item.name}>
      {item.name}
    </option>
  ));

  return (
    <select className="form-select form-select-lg mb-3">
      {/* <option selected>Choose area</option> */}
      {data.length > 0 && allData}
    </select>
  );
};
export default Select;
