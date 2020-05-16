import React, { useState } from "react";

import AddPersonForm from "./components/AddPersonForm";
import FilterNamesForm from "./components/FilterNamesForm";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040040487" },
    { name: "Teppo Winnipeg", number: "040040480" },
    { name: "Uolevi Sinisilmä", number: "040666487" },
    { name: "Marjatta Sinisilmä", number: "040664487" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // if no value for filter field, show all persons
  // otherwise filter relevant names from persons list
  const personsToShow = filterValue
    ? persons.filter(({ name }) =>
        name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();

    const nameExists = persons.some(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      alert(`${newName} is already in the phonebook, please select another`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Add a new person</h2>
      <AddPersonForm
        submitHandler={addPerson}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        name={newName}
        number={newNumber}
      />

      <h2>Numbers</h2>
      <FilterNamesForm
        filterHandler={handleFilterChange}
        filterValue={filterValue}
      />

      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
