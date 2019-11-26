import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    height: 278,
    width: 185,
  },
}));

function MovieItem(props) {
  const classes = useStyles();
  const review = props.media.combinable
    ? <Typography>{props.media.combinable.body}</Typography>
    : <><TextField /><Button ></Button></>
  return (
    <Card>
      <CardHeader
        title={props.media.title}
        subheader={props.media.year_of_release} />
      <CardMedia
        image={props.media.poster_url}
        title={'Poster for ' + props.media.title}
        className={classes.media} />
      <CardContent>
        {review}
      </CardContent>
      <CardActions>
        {/* <Button
          onClick={} >
          Add to Library
        </Button> */}
      </CardActions>
    </Card>
  )
}

export default MovieItem;
