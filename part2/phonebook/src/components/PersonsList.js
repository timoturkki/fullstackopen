import React from "react";

const PersonsList = ({ persons, deleteHandler }) => {
  return (
    <ul>
      {persons.map(({ name, number, id }) => (
        <li key={`person-${id}`}>
          {name} - {number || "this person does not have phonenumber"}{" "}
          <button type="submit" onClick={() => deleteHandler(id, name)}>
            Delete me
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;
