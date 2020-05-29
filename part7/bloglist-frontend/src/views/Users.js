import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Users = () => {
  const users = useSelector(({ users }) => users);
  return (
    <>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ name, username, blogs, id }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link to={`/users/${id}`}>{name}</Link>
                </TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>{blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
