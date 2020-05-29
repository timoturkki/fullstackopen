import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <small>Loading... please wait.</small>
      <LinearProgress />
    </div>
  );
};

export default Loading;
