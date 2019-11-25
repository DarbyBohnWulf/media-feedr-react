import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MovieSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleQuery: '',
      tmdbApiPrefix: 'https://api.themoviedb.org/3/search',
      searchType: 'movie',
      results: []
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  switchSearch = () => {
    this.state.searchType === 'movie'
      ? this.setState({ searchType: 'tv' })
      : this.setState({ searchType: 'movie' })
  }

  searchTmdb = async () => {
    const searchUrl = 
      this.state.tmdbApiPrefix
      + '/'
      + this.state.searchType
      + '?'
      + 'api_key='
      + process.env.REACT_APP_TMDB_API_KEY
      + '&'
      + 'query='
      + this.state.titleQuery
    const response = await fetch(searchUrl);
    const parsedResponse = await response.json();
    this.setState({ results: parsedResponse.results });
  }

  render() {
    const searchTypeHint = this.state.searchType === 'movie'
      ? <Typography variant='subtitle2' onClick={this.switchSearch} >
          Click here to find a series instead.
        </Typography>
      : <Typography variant='subtitle2' onClick={this.switchSearch} >
          Click here to find a film instead.
        </Typography>
    return (
      <Modal
        open={this.props.searching}
        onClose={this.props.onClose}
        >
        <Card>
          <CardHeader
            title={
              this.state.searchType === 'movie'
                ? "Search For a Film"
                : "Search For a Series"
            }
            subheader="powered by TheMovieDatabase.com" />
          <CardContent>
            <TextField
              label="Search"
              name="titleQuery"
              value={this.state.titleQuery}
              variant="outlined"
              onChange={this.handleChange} />
            {searchTypeHint}
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button color="primary" onClick={this.searchTmdb}>Search</Button>
              <Button color="secondary" onClick={this.props.onClose} >Cancel</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Modal>
    )
  }
}

export default MovieSearchModal;
