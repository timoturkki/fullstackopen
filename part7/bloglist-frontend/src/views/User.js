import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const match = useRouteMatch('/users/:id');
  const user = useSelector(({ users }) => {
    return match ? users.find(u => u.id === match.params.id) : null;
  });

  console.log(user);

  if (!user) {
    return (
      <h2>User not found...</h2>
    );
  }

  const { name, blogs } = user;

  return (
    <>
      <h2>{name}</h2>
      {!blogs.length ?
        <p>No blogs found for this user!</p>  :
        <ul>
          {blogs.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      }
    </>
  );
};

export default User;
