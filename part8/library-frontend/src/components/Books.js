import React, { useState } from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all');
  const books = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <p>Loading...</p>;
  }

  const allBooks = books.data.allBooks;
  const booksToShow = genre === 'all' ?
    allBooks :
    books.data.allBooks.filter(book => book.genres.includes(genre));
  const uniqueGenres = allBooks
    .reduce((acc, cur) => [...acc, ...cur.genres], [])
    .filter((v, i, self) => self.indexOf(v) === i);

  return (
    <div>
      <h2>books</h2>

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
          {booksToShow.map(({ title, author, published }) =>
            <tr key={title}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>,
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        {uniqueGenres.map(genre =>
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>,
        )}
        <button onClick={() => setGenre('all')}>all</button>
      </div>
    </div>
  );
};

export default Books;