import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MediaItem from './MediaItem';


function MediaCatalog(props) {
  const combinedProps = props.library.map(l => {
    const combinable = props.reviews.find(r => r.media_id.id === l.id)
    l = combinable ? {...l,combinable} : l
    return l
  });
  const library = combinedProps.map(m => {
    return (
      <MediaItem
        key={m.external_id}
        media={m}
        addReview={props.addReview}
        showMedia={props.showMedia}
        loggedIn={props.loggedIn} />
    )
  });

  return (
    <Paper>
      <Typography variant='h4'>Library</Typography>
      {library}
    </Paper>
  )
}

export default MediaCatalog;
