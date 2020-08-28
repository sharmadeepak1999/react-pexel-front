import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from "@material-ui/icons/ExitToApp"
import AccountCircle from "@material-ui/icons/AccountCircle"
import PhotoLibrary from "@material-ui/icons/PhotoLibrary"
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate"
import Home from "@material-ui/icons/Home"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const sideDrawer = (props) => {
  const classes = useStyles();

  let list = (
    <div
        className={classes.list}
        role="presentation"
        onClick={props.closeDrawer}
        onKeyDown={props.closeDrawer}
      >
        <List>
          <ListItem key={'hello'}>
            <ListItemIcon><AccountCircle/></ListItemIcon>
            <ListItemText primary={`Hello, ${props.username ? (props.username.trim()).substring(0, 20) : 'User'}`} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <Link 
            to={"/"}
            style={{ textDecoration: 'none', color: 'black'}}>
            <ListItem button key={'home'}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>
          <Link 
            to={"/pexels/my"}
            style={{ textDecoration: 'none', color: 'black'}}>
            <ListItem button key={'myPexels'}>
              <ListItemIcon><PhotoLibrary/></ListItemIcon>
              <ListItemText primary={'My Pexels'} />
            </ListItem>
          </Link>
          <Link 
            to={"/pexels/new"}
            style={{ textDecoration: 'none', color: 'black'}}>
            <ListItem button key={'uploadPexel'}>
              <ListItemIcon><AddPhotoAlternate/></ListItemIcon>
              <ListItemText primary={'Upload Pexel'} />
            </ListItem>
          </Link>
          <Link 
            to={"/logout"}
            style={{ textDecoration: 'none', color: 'black'}}>
            <ListItem button key={'logout'}>
              <ListItemIcon><ExitToApp/></ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </Link>
        </List>
      </div>
  );

  return (
    <Drawer anchor={"left"} open={props.showSideDrawer} onClose={props.closeDrawer}>    
      {list}
    </Drawer>
  );
}

export default sideDrawer