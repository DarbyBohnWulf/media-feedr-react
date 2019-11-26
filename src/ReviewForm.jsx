import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      body: '',
      media_id: this.props.media_id,
      action: 'post'
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addReview(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <FormLabel>Rating: </FormLabel>
        <Select
          native
          value={this.state.rating}
          onChange={this.handleChange}
          name='rating' >
            <option value=''/>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
        </Select><br/>
        <FormLabel>Body: </FormLabel>
        <TextField
          type='text'
          name='body'
          value={this.state.body}
          onChange={this.handleChange} /><br/>
        <Button type='submit'>Post</Button>
      </form>
    )
  }
}

export default ReviewForm;
