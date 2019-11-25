import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  // card: {
  //   display: 'flex',
  // },
  // TODO: make these prettier
  media: {
    height: 278,
    width: 185,
  },
}));

const tmdbBaseUrl = 'https://image.tmdb.org/t/p/w185';

// this is to coerce the data into the shape my db expects
function makeMediaFeedrShaped(tmdbData) {
  const feedrBite = {};
  feedrBite.title = tmdbData.title ? tmdbData.title : tmdbData.name;
  const release_date = tmdbData.release_date
    ? tmdbData.release_date
    : tmdbData.first_air_date
  feedrBite.year_of_release = release_date
    ? parseInt(release_date.split('-')[0])
    : 1999;
  feedrBite.genre = parseGenre(tmdbData.genre_ids[0])
  feedrBite.poster_url = tmdbBaseUrl + tmdbData.poster_path;
  feedrBite.external_id = tmdbData.id;
  return feedrBite
}

function parseGenre(genreId) {
  switch (genreId) {
    case 12:
      return 'Adventure';
    case 14:
      return 'Fantasy';
    case 16:
      return 'Animation'
    case 18:
      return 'Drama';
    case 27:
      return 'Horror'
    case 28:
      return 'Action'
    case 35:
      return 'Comedy'
    case 36:
      return 'History'
    case 37:
      return 'Western'
    case 53:
      return 'Thriller'
    case 80:
      return 'Crime'
    case 99:
      return 'Documentary'
    case 878:
      return 'Science Fiction'
    case 9648:
      return 'Mystery'
    case 10402:
      return 'Music'
    case 10749:
      return 'Romance'
    case 10751:
      return 'Family'
    case 10752:
      return 'War'
    case 10770:
      return 'TV Movie'
    default:
      return '';
  }
}

function SearchResult(props) {
  const classes = useStyles();
  const title = props.result.title ? props.result.title : props.result.name
  const shapedData = makeMediaFeedrShaped(props.result);
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={props.result.release_date} />
      <CardMedia
        image={tmdbBaseUrl + props.result.poster_path}
        title={'Poster for ' + title}
        className={classes.media} />
      <CardContent>
        <Typography variant='body1' >
          {props.result.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => props.addToLibrary(shapedData)} >
          Add to Library
        </Button>
      </CardActions>
    </Card>
  )
}

export default SearchResult;
