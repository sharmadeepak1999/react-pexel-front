import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const authComponent = (props) => {
  const classes = useStyles();

  const displayUsernameField = props.isSignup ? (
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
      value={props.username}
      onChange={(e) => props.onInputChange(e, 'username')}
    />
  ) : null

  const authTypeText = props.isSignup ? 'Sign Up' : 'Sign In'

  const switchAuthTypeText = props.isSignup ? "Have an account? Sign In" : "Don't have an account? Sign Up"
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {authTypeText}
        </Typography>
        <form className={classes.form}>
          {displayUsernameField}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={props.email}
            onChange={(e) => props.onInputChange(e, 'email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={props.password}
            onChange={(e) => props.onInputChange(e, 'password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.onFormSubmit}
          >
            {authTypeText}
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <a href='' onClick={props.changeAuthType}>{switchAuthTypeText}</a>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default authComponent