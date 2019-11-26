import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MovieItem from './MovieItem';


function MovieList(props) {
  const combinedProps = props.library.map(l => {
    const combinable = props.reviews.find(r => r.media_id.id === l.id)
    l = combinable ? {...l,combinable} : l
    return l
  });
  const library = combinedProps.map(m => <MovieItem key={m.external_id} media={m} />);

  return (
    <Paper>
      <Typography variant='h4'>Libary</Typography>
      {library}
    </Paper>
  )
}

export default MovieList;
