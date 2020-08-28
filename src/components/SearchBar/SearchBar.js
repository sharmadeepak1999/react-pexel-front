import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: "auto",
    maxWidth: 600
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const searchBar= (props) => {
  const classes = useStyles();

  return (
    <Paper component="form" elevation={3} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Pexels"
        inputProps={{ 'aria-label': 'search pexels' }}
        value={props.queryText}
        onChange={props.onInputChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={props.onSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default searchBar