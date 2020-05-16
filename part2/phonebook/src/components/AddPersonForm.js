import React from "react";

const AddPersonForm = ({
  submitHandler,
  nameHandler,
  numberHandler,
  name,
  number,
}) => (
  <form onSubmit={submitHandler}>
    <div>
      <label htmlFor="fullName">Full name</label>
      <br />
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={name}
        onChange={nameHandler}
      />
    </div>

    <div>
      <label htmlFor="number">Phonenumber</label>
      <br />
      <input
        type="text"
        id="number"
        name="number"
        value={number}
        onChange={numberHandler}
      />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default AddPersonForm;
