import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LoginForm from './LoginForm';
import UserContainer from './UserContainer';
import MovieContainer from './MovieContainer';

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
      credentials: 'include',
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
      credentials: 'include',
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
      ? <UserContainer currentUser={this.state.currentUser} />
      : <LoginForm
          apiUrl={this.state.apiUrl}
          login={this.login}
          register={this.register} />
    return (
      <Grid
        container
        spacing={3}
        justify='center'
        alignItems='stretch' >
        <Grid item xs={5} >
          <Paper>
            <Typography variant='h3' >User-y Things</Typography>
            {userStuff}
          </Paper>
        </Grid>
        <Grid item xs={5} >
          <Paper>
            <MovieContainer loggedIn={this.state.loggedIn} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
