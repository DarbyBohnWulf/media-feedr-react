import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import ReviewDisplay from './ReviewDisplay';

const useStyles = makeStyles(theme => ({
  media: {
    height: 278,
    width: 185,
  },
}));

function MediaItem(props) {
  const classes = useStyles();
  const review = props.media.combinable
    ? <ReviewDisplay review={props.media.combinable} loggedIn={props.loggedIn} />
    : null
  return (
    <Card>
      <CardActionArea onClick={() => props.showMedia(props.media.id)}>
        <CardHeader
          title={props.media.title}
          subheader={props.media.year_of_release} />
        <CardMedia
          image={props.media.poster_url}
          title={'Poster for ' + props.media.title}
          className={classes.media} />
      </CardActionArea>
      <CardContent>
        {review}
      </CardContent>
    </Card>
  )
}

export default MediaItem;
