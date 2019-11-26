import React from 'react';
import Grade from '@material-ui/icons/Grade';
import Typography from '@material-ui/core/Typography';

function ReviewDisplay(props) {
  return (
    <>
      {
        [...Array(props.review.rating)].map((e,i) => {
          return <Grade key={props.review.media_id + '_' + i} />
        })
      }
      <Typography variant='body2'>{props.review.body}</Typography>
    </>
  )
}

export default ReviewDisplay;
