import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class MovieSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleQuery: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Modal
        open={this.props.searching}
        onClose={this.props.onClose}
        >
        <Card>
          <CardHeader
            title="Search For a Film or Series"
            subheader="powered by TheMovieDatabase.com" />
          <CardContent>
            <TextField
              label="Search"
              name="titleQuery"
              value={this.state.titleQuery}
              variant="outlined"
              onChange={this.handleChange} />
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button color="primary" >Search</Button>
              <Button color="secondary" onClick={this.props.onClose} >Cancel</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Modal>
    )
  }
}

export default MovieSearchModal;
