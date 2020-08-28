import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: "5%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const toolbar = (props) => {
    const classes = useStyles();

    let navigation = (
        <NavLink 
            to={"/auth"}
            exact
            style={{ textDecoration: 'none', color: 'white'}}
        >
            <Button color="inherit" size="small">
                Sign In
            </Button>
        </NavLink>
    )

    if(props.history.location.pathname === "/auth") {
        navigation = null
    }

    let drawerToggleButton = null

    if(props.isAuthenticated) {
        drawerToggleButton = (
            <IconButton edge="start" onClick={props.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
        )
        navigation = (
            <NavLink 
                to={"/logout"}
                exact
                style={{ textDecoration: 'none', color: 'white'}}
            >
                 <Button color="inherit" size="small">
                    Logout
                </Button>
            </NavLink>
        )
    }
    return (
    <div className={classes.root}>
        <AppBar position="fixed">
        <Toolbar>
            {drawerToggleButton}
            <Typography variant="h6" className={classes.title}>
                <NavLink 
                    to={"/"}
                    exact
                    style={{ textDecoration: 'none', color: 'white'}}
                >React Pexel</NavLink>
            </Typography>
            {navigation}
        </Toolbar>
        </AppBar>
    </div>
    )
}

export default withRouter(toolbar);