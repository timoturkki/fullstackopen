import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Blog = ({ blog, index }) => {
  const { title, author, id } = blog;
  const background = { backgroundColor: 'rgba(255,255,255, 0.05)' };

  return (
    <li style={index % 2 === 0 ? background : {}}>
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
  index: PropTypes.number.isRequired,
};

export default Blog;