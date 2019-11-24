import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LoginForm from './LoginForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      apiUrl: 'http://localhost:8000/api/v1',
      currentUser: {}
    }
  }

  login = async userInfo => {
    const response = await fetch(this.state.apiUrl + '/user/login', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.status.code === 200) {
      this.setState({
        loggedIn: true,
        currentUser: parsedResponse.data
      });
    } else {
      console.log("Couldn't authenticate.");
      console.log(parsedResponse);
    }
  }

  render() {
    const userStuff = this.state.loggedIn
      ? <Typography>Welcome, User</Typography>
      : <LoginForm apiUrl={this.state.apiUrl} login={this.login} />
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
