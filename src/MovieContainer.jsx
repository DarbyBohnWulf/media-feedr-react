import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MediaCatalog from './MediaCatalog';

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      apiUrl: this.props.apiUrl,
      media: [],
      reviewedMedia: [],
    }
  }

  componentDidMount() {
    this.getAllMovies();
  }

  async getAllMovies() {
    const latestUrl = this.state.apiUrl + '/media/latest';
    const latestResponse = await fetch(latestUrl, {
      credentials: 'include'
    });
    const parsedLatest = await latestResponse.json();
    const mediaUrl = this.state.apiUrl + '/media/';
    const mediaResponse = await fetch(mediaUrl);
    const parsedMedia = await mediaResponse.json();
    this.setState({
      media: [...this.state.media, ...parsedMedia.data],
      reviewedMedia: [...this.state.reviewedMedia, ...parsedLatest.data]
    })
  }

  render() {
    return (
      <Grid
        container
        item >
        <Typography variant='h4' >Media Container</Typography>
        <MediaCatalog
          loggedIn={this.state.loggedIn}
          showMedia={this.props.showMedia}
          reviews={this.state.reviewedMedia}
          library={this.state.media} />
      </Grid>
    )
  }
}

export default MovieContainer;
