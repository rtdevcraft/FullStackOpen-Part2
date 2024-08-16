import Person from "./Person";

const Phonebook = ({ persons, searchTerm, onDelete }) => {
  if (!persons) return null;

  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map((person) => (
          <Person person={person} key={person.id} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
};

export default Phonebook;
