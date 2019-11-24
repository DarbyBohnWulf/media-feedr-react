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

  register = async userInfo => {
    const response = await fetch(this.state.apiUrl + '/user/register', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.status.code === 201) {
      this.setState({
        loggedIn: true,
        currentUser: parsedResponse.data
      });
    } else {
      console.log("Couldn't register.");
      console.log(parsedResponse);
    }
  }

  render() {
    const userStuff = this.state.loggedIn
      ? <Typography>Welcome, {this.state.currentUser.username} </Typography>
      : <LoginForm
          apiUrl={this.state.apiUrl}
          login={this.login}
          register={this.register} />
    return (
      <Grid
        container
        spacing={1}
        justify='center'
        alignItems='stretch' >
        <Grid item xs={6} >
          <Paper>
            <Typography variant='h3' >User-y Things</Typography>
            {userStuff}
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper>
            <Typography variant='h3' >Bars</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
