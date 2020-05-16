import React, { useState, useEffect } from "react";

import AddPersonForm from "./components/AddPersonForm";
import FilterNamesForm from "./components/FilterNamesForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  // if no value for filter field, show all persons
  // otherwise filter relevant names from persons list
  const personsToShow = filterValue
    ? persons.filter(({ name }) =>
        name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : persons;

  const clearPersonInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) {
      alert("please type in a name");
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    const hasSameName = ({ name }) =>
      name.toLowerCase() === newName.toLowerCase();
    const nameExists = persons.some(hasSameName);

    if (nameExists) {
      if (window.confirm(`${newName} already exists, want to update number?`)) {
        const { id } = persons.find(hasSameName);
        console.log(id);

        personsService.updatePerson(id, newPerson).then((returnedPerson) => {
          console.log(returnedPerson);
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          clearPersonInputs();
        });
      }
    } else {
      personsService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      clearPersonInputs();
    }
  };

  const deleteUser = (id, name) => {
    if (
      window.confirm(`Are you sure sure you want to delete ${name} (${id})`)
    ) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
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

      <PersonsList persons={personsToShow} deleteHandler={deleteUser} />
    </div>
  );
};

export default App;
