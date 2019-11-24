import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      action: 'login'
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.loginOrRegister();
  }

  loginOrRegister() {
    if (this.state.action === 'login') {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    } else {
      this.props.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <FormLabel>Username: </FormLabel>
        <Input
          type='text'
          name='username'
          value={this.state.username}
          onChange={this.handleChange} /><br/>
        <FormLabel>E-Mail: </FormLabel>
        <Input
          type='email'
          name='email'
          value={this.state.email}
          onChange={this.handleChange} /><br/>
        <FormLabel>Password: </FormLabel>
        <Input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange} /><br/>
        <Button type='submit'>Login</Button>
      </form>
    )
  }
}

export default LoginForm;
