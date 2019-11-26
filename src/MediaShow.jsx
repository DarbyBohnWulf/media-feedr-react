import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ReviewDisplay from './ReviewDisplay';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    height: 278,
    width: 185,
  },
}));

function MediaShow(props) {
  const classes = useStyles();
  const reviews = props.media.reviews
    ? props.media.reviews.map(r => {
        return (
          <ReviewDisplay
            key={r.id}
            review={r}
            showUser={props.showUser}
            loggedIn={props.loggedIn} />
        )
      })
    : null
  return (
    <Paper>
      <Card>
        <CardHeader
          title={props.media.title}
          subheader={props.media.year_of_release} />
        <CardMedia
          image={props.media.poster_url}
          title={'Poster for ' + props.media.title}
          className={classes.media} />
      </Card>
      {reviews}
    </Paper>
  )
}

export default MediaShow;
