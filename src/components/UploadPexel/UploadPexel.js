import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import { OutlinedInput } from '@material-ui/core';
import Paper from "@material-ui/core/Paper"
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const uploadPexel = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h5">
          <AddPhotoAlternate /> Upload Pexel
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={props.title}
            onChange={(e) => props.onInputChange(e, 'title')}
          />
          <FormControl style={{ width: "100%", marginTop: "30px", }} variant="outlined">
            <OutlinedInput
              id="image"
              aria-describedby="image"
              type="file"
              onChange={(e) => props.onFileChange(e, 'image')}/>
            <FormHelperText>Upload an image</FormHelperText>
          </FormControl>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.onFormSubmit}
          >
            Upload
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default uploadPexel