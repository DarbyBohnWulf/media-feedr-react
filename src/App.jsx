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
      loggedUser: {},
      apiUrl: process.env.REACT_APP_API_PREFIX,
      currentUser: {},
      currentMedia: {}
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
        loggedUser: parsedResponse.data,
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
        loggedUser: parsedResponse.data,
        currentUser: parsedResponse.data
      });
    } else {
      console.log("Couldn't register.");
      console.log(parsedResponse);
    }
  }

  showUser = userObj => {
    this.setState({
      currentUser: userObj
    });
  }

  showMedia = async mediaId => {
    const mediaUrl = this.state.apiUrl + '/media/' + mediaId;
    const mediaResponse = await fetch(mediaUrl);
    const parsedMedia = await mediaResponse.json();
    this.setState({
      currentMedia: parsedMedia.data
    });
  }

  render() {
    const userStuff = this.state.loggedIn
      ? <UserContainer
          currentUser={this.state.currentUser}
          own={this.state.loggedUser === this.state.currentUser}
          apiUrl={this.state.apiUrl}
          showMedia={this.showMedia}
          showUser={this.showUser} />
      : <LoginForm
          apiUrl={this.state.apiUrl}
          login={this.login}
          register={this.register} />
    const mediaStuff = this.state.currentMedia.hasOwnProperty('id')
      ? null
      : <MovieContainer
          loggedIn={this.state.loggedIn}
          apiUrl={this.state.apiUrl}
          showMedia={this.showMedia}
          showUser={this.showUser} />
    return (
      <Grid
        container
        spacing={3}
        justify='center'
        alignItems='stretch' >
        <Grid item xs={5} >
          <Paper
            title='User Container' >
            {userStuff}
          </Paper>
        </Grid>
        <Grid item xs={5} >
          <Paper>
            {mediaStuff}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
