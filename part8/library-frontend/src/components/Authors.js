
import React from 'react';
import { useQuery } from '@apollo/client';

import EditAuthor from './EditAuthor';
import { ALL_AUTHORS } from '../queries';

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>,
          )}
        </tbody>
      </table>

      <EditAuthor authors={authors.data.allAuthors} />
    </div>
  );
};

export default Authors;
