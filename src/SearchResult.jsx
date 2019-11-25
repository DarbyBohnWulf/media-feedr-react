import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function SearchResult(props) {
  const tmdbBaseUrl = 'https://image.tmdb.org/t/p/w185';
  const title = props.result.title ? props.result.title : props.result.name
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={props.result.release_date} />
      <CardMedia
        image={tmdbBaseUrl + props.result.poster_path}
        mediaStyle={'height: 278px'}
        title={'Poster for ' + title} />
      <CardContent>
        <Typography variant='body1'>
          {props.result.overview}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SearchResult;
