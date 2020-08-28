import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const alert = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={4000} TransitionComponent={Fade} anchorOrigin={{ vertical: props.positionVertical, horizontal: props.positionHorizontal }} onClose={props.onAlertClose}>
        <Alert onClose={props.onAlertClose} severity={props.alertType}>
          {props.children}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default alert