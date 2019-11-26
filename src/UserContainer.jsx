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

  addToLibrary = async mediaInfo => {
    const mediaUrl = process.env.REACT_APP_API_PREFIX + '/media/';
    const catalogResponse = await fetch(mediaUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(mediaInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedCatalogResponse = await catalogResponse.json();
    if (parsedCatalogResponse.status.code === 201) {
      const viewershipUrl = process.env.REACT_APP_API_PREFIX + '/viewership/';
      const viewrshipObj = {
        media_id: parsedCatalogResponse.data.id,
        user_id: this.state.currentUser.id
      }
      const viewershipResponse = await fetch(viewershipUrl, {
        method: 'POST',
        body: JSON.stringify(viewrshipObj),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedViewershipRes = await viewershipResponse.json();
      if (parsedViewershipRes.status.code === 201) {
        this.setState({
          userLibrary: [...this.state.userLibrary, parsedCatalogResponse.data],
          searching: false
        });
      }
    }
  }

  removeViewership = async mediaId => {
    const removalUrl = this.state.apiPref + '/viewership/' + mediaId
    const removalResponse = await fetch(removalUrl, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (removalResponse.status === 204) {
      this.setState({
        userLibrary: this.state.userLibrary.filter(l => l.id !== mediaId)
      });
    }
  }

  addReview = async review => {
    const newReview = await fetch(this.state.apiPref + '/reviews/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedNewReview = await newReview.json();
    if (parsedNewReview.status.code === 201) {
      this.setState({
        userReviews: [...this.state.userReviews,parsedNewReview.data]
      });
    }
  }

  render() {
    return (
      <Paper>
        <MovieSearchModal
          searching={this.state.searching}
          onClose= {this.closeModal}
          userId={this.state.currentUser.id}
          addToLibrary={this.addToLibrary} />
        <Typography>Media Added By {this.state.currentUser.username}</Typography>
        <MovieList
          library={this.state.userLibrary}
          reviews={this.state.userReviews}
          delete={this.removeViewership}
          addReview={this.addReview} />
        <Button
          onClick={this.startSearching} >
          Add A New Film
        </Button>
      </Paper>
    )
  }
}

export default UserContainer;
