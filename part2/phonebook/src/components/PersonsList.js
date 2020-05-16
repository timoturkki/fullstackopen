import React from "react";

const PersonsList = ({ persons }) => {
  return (
    <ul>
      {persons.map(({ name, number, id }) => (
        <li key={`person-${id}`}>
          {name} - {number || "this person does not have phonenumber"}
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;
