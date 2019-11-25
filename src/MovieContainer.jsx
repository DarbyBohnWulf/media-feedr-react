import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }

  render() {
    return (
      <Grid
        container
        item >
        <Typography variant='h4' >List Goes Here</Typography>
      </Grid>
    )
  }
}

export default MovieContainer;
