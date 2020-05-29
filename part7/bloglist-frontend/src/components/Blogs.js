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
  list: {
    padding: 0,
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
          <List className={classes.list}>
            {sortedByLikes.map((blog, i) =>
              <Blog
                key={`blog-${blog.id}`}
                blog={blog}
                index={i}
              />,
            )}
          </List>
        </div>
      }
    </>
  );
};

export default Blogs;