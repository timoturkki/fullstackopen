import React, { useState, useEffect } from "react";

import AddPersonForm from "./components/AddPersonForm";
import FilterNamesForm from "./components/FilterNamesForm";
import PersonsList from "./components/PersonsList";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const NOTIFICATION_DEFAULT_DURATION_MS = 5000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notification, setNotification] = useState();
  const [hasError, setHasError] = useState(false);

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

  const triggerNotification = (message, isErrorMsg = false) => {
    setNotification(message);
    setHasError(isErrorMsg);

    setTimeout(() => {
      setNotification("");
      setHasError(false);
    }, NOTIFICATION_DEFAULT_DURATION_MS);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) {
      triggerNotification("You have not entered a name");
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    const hasSameName = ({ name }) =>
      name.toLowerCase() === newName.toLowerCase();
    const nameExists = persons.some(hasSameName);

    if (nameExists) {
      if (window.confirm(`${newName} already exists, want to update number?`)) {
        const { id } = persons.find(hasSameName);

        personsService
          .updatePerson(id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            clearPersonInputs();
            triggerNotification(
              `Person ${returnedPerson.name} updated with new number!`
            );
          })
          .catch((e) => {
            triggerNotification(
              `Error, ${newName} has already been removed`,
              true
            );
          });
      }
    } else {
      personsService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        triggerNotification(`Person ${returnedPerson.name} added!`);
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
        triggerNotification(`Person ${name} deleted!`);
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

      <Notification message={notification} isError={hasError} />

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
