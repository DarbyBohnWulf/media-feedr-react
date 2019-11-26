import React from 'react';
import SearchResult from './SearchResult';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
    const results = this.state.results.map(r => {
      return (
        <Grid item key={r.id}>
          <SearchResult result={r} addToLibrary={this.props.addToLibrary} />
        </Grid>
      )
    });
    return (
      <Dialog
        open={this.props.searching}
        onClose={this.props.onClose}
        scroll='paper'
        aria-labelledby='movie-search-modal-title' >
        <DialogTitle id="movie-search-modal-title" >
          {
            this.state.searchType === 'movie'
              ? "Search For a Film"
              : "Search For a Series"
          }
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Search"
            name="titleQuery"
            value={this.state.titleQuery}
            variant="outlined"
            onChange={this.handleChange}
            onSubmit={this.searchTmdb} />
          {searchTypeHint}
          <Grid container spacing={2} >
            {results}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.searchTmdb} >Search</Button>
          <Button color="secondary" onClick={this.props.onClose} >Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default MovieSearchModal;
