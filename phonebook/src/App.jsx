import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Search from "./components/Search";
import AddPeopleForm from "./components/AddPeopleForm";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => {
        showNotification("Failed to fetch contacts", "error");
      });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            return returnedPerson;
          })
          .then((updatedPerson) => {
            showNotification(
              `Updated ${updatedPerson.name}'s number`,
              "success"
            );
          })
          .catch((error) => {
            showNotification(
              `Failed to update ${newPerson.name}'s number`,
              "error"
            );
          });
      }
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          return returnedPerson;
        })
        .then((createdPerson) => {
          showNotification(`Added ${createdPerson.name}'s number`, "success");
        })
        .catch(() => {
          showNotification(`Failed to add ${newPerson.name}'s number`, "error");
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          return person;
        })
        .then((deletedPerson) => {
          showNotification(`Deleted ${deletedPerson.name}`, "success");
        })
        .catch((error) => {
          showNotification(`Failed to delete ${person.name}`, "error");
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <AddPeopleForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Phonebook
        persons={persons}
        searchTerm={searchTerm}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
