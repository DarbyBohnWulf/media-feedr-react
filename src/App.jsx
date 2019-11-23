import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  render() {
    const userStuff = this.state.loggedIn
      ? <Typography>Welcome, User</Typography>
      : <Typography component='h2'>Login Goes Here</Typography>
    return (
      <Grid
        container
        justify='center'
        alignItems='stretch' >
        <Grid item>
          <Paper>
            <h1>User-y Things</h1>
            {userStuff}
          </Paper>
        </Grid>
        <Paper>
          <h1>Bars</h1>
        </Paper>
      </Grid>
    );
  }
}

export default App;
