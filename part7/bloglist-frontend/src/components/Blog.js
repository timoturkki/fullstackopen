import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Blog = ({ blog }) => {
  const { title, author, id } = blog;

  return (
    <li>
      <Link to={`/blogs/${id}`}>
        <ListItem button>
          <ListItemText primary={`${title}, written by: ${author}`} />
        </ListItem>
      </Link>
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;