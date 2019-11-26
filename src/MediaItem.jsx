import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewDisplay';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  media: {
    height: 278,
    width: 185,
  },
}));

function MediaItem(props) {
  const classes = useStyles();
  const review = props.media.combinable
    ? <ReviewDisplay review={props.media.combinable} />
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
