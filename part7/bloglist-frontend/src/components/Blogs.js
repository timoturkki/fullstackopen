import React from 'react';
import { useSelector } from 'react-redux';

import Loading from './Loading';
import Blog from './Blog';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Blogs = () => {
  const classes = useStyles();
  const blogs = useSelector(({ blogs }) => blogs);

  if (!blogs) {
    return (<p>No blogs added!</p>);
  }

  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      {!blogs.length ?
        <Loading /> :
        <div className={classes.root}>
          <List>
            {sortedByLikes.map((blog) =>
              <Blog
                key={`blog-${blog.id}`}
                blog={blog}
              />,
            )}
          </List>
        </div>
      }
    </>
  );
};

export default Blogs;