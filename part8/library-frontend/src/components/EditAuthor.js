import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  { query: ALL_AUTHORS } ],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setName('');
    setBorn('');
  };


  return (
    <div>
      <h3>Set year of birth</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditAuthor;