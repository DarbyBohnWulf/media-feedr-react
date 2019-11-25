import React from 'react';
import MovieSearchModal from './MovieSearchModal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      searching: false
    }
  }

  startSearching = () => {
    this.setState({ searching: true });
  }

  closeModal = () => {
    this.setState({ searching: false });
  }

  render() {
    return (
      <Paper>
        <MovieSearchModal
          searching={this.state.searching}
          onClose= {this.closeModal}
          userId={this.state.currentUser.id} />
        <Typography>Welcome, {this.state.currentUser.username} </Typography>
        <Button
          onClick={this.startSearching} >
          Add A New Film
        </Button>
      </Paper>
    )
  }
}

export default UserContainer;
