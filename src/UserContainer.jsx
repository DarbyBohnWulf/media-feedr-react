import React from 'react';
import MovieSearchModal from './MovieSearchModal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      searching: false,
      apiPref: process.env.REACT_APP_API_PREFIX,
      userLibrary: [],
      userReviews: []
    }
  }

  componentDidMount() {
    this.getLibrary(this.state.currentUser.id)
  }

  startSearching = () => {
    this.setState({ searching: true });
  }

  closeModal = () => {
    this.setState({ searching: false });
  }

  getLibrary = async userId => {
    const library = await fetch(this.state.apiPref + '/viewership/' + userId, {
      credentials: 'include'
    });
    const parsedLibrary = await library.json();
    console.log(parsedLibrary.data)
    this.setState({
      userLibrary: [...parsedLibrary.data]
    });
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
