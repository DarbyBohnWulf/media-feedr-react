import React from 'react';
import Typography from '@material-ui/core/Typography';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      searching: false
    }
  }

  render() {
    return (
      <Typography>Welcome, {this.state.currentUser.username} </Typography>
    )
  }
}

export default UserContainer;
