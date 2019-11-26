import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

function FeedrBar(props) {
  return (
    <AppBar position='static' >
      <Toolbar>
        <Button onClick={props.showSelf} >Home</Button>
        {
          props.loggedIn
            ? <Button onClick={props.logout} >Logout</Button>
            : null
        }
      </Toolbar>
    </AppBar>
  )
}

export default FeedrBar;
