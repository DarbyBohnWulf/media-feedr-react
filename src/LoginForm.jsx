import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

  switchAction = () => {
    this.state.action === 'login'
      ? this.setState({ action: 'register' })
      : this.setState({ action: 'login' })
  }

  render() {
    const authMessage = this.state.action === 'login'
      ? <Typography>
          Need an account? Click <span onClick={this.switchAction}>here</span> to register.
        </Typography>
      : <Typography>
          Already have an account? Click <span onClick={this.switchAction}>here</span> to login.
        </Typography>
      const usernameField = this.state.action === 'login'
        ? undefined
        : <>
            <FormLabel>Username: </FormLabel>
            <TextField
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange} /><br/>
          </>
    return (
      <form onSubmit={this.handleSubmit} >
        {usernameField}
        <FormLabel>E-Mail: </FormLabel>
        <TextField
          type='email'
          name='email'
          value={this.state.email}
          onChange={this.handleChange} /><br/>
        <FormLabel>Password: </FormLabel>
        <TextField
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange} /><br/>
        <Button type='submit'>
          {this.state.action === 'login' ? 'Login' : 'Register'}
        </Button>
        {authMessage}
      </form>
    )
  }
}

export default LoginForm;
