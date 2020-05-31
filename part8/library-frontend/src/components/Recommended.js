import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { BOOKS_BY_GENRE } from '../queries';

const Recommended = ({ show, genre }) => {
  const [getBooksByGenre, booksByGenre] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooksByGenre({ variables: { genre } });
  }, [getBooksByGenre, genre]);

  if (!show) {
    return null;
  }

  if (booksByGenre.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books matching your favorite genre <strong>{genre}</strong> is:</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.data.allBooks.map(({ title, author, published }) =>
            <tr key={title}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
