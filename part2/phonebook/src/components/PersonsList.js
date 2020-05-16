import React from "react";

const PersonsList = ({ persons }) => {
  return (
    <ul>
      {persons.map(({ name, number }, i) => (
        <li key={`${name.replace(/ /g, "-")}-${i}`}>
          {name} - {number || "this person does not have phonenumber"}
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;
