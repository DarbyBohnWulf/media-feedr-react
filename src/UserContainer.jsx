import React from 'react';
import MovieSearchModal from './MovieSearchModal';
import MovieList from './MovieList';
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
    this.getLibrary(this.state.currentUser.id);
    this.getReviews(this.state.currentUser.id);
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
    this.setState({
      userLibrary: [...parsedLibrary.data]
    });
  }

  getReviews = async userId => {
    const reviews = await fetch(this.state.apiPref + '/reviews/' + userId, {
      credentials: 'include'
    });
    const parsedReviews = await reviews.json();
    this.setState({
      userReviews: [...parsedReviews.data]
    });
  }



  render() {
    return (
      <Paper>
        <MovieSearchModal
          searching={this.state.searching}
          onClose= {this.closeModal}
          userId={this.state.currentUser.id} />
        <Typography>Welcome, {this.state.currentUser.username}!</Typography>
        {/* {list} */}
        <MovieList library={this.state.userLibrary} reviews={this.state.userReviews} />
        <Button
          onClick={this.startSearching} >
          Add A New Film
        </Button>
      </Paper>
    )
  }
}

export default UserContainer;
