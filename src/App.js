import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash'
import cookie from 'react-cookies'

import PropTypes from 'prop-types'

import ForgotPasswordPage from './User/ForgotPasswordPage';
import LoginPage from './User/LoginPage';
import MemeListPage from './Meme/MemeListPage';
import Menu from './Layout/Menu';
import RegisterPage from './User/RegisterPage';
import UpdatePasswordPage from './User/UpdatePasswordPage';
import UserEditPage from './User/Users/UserEditPage';
import UserListPage from './User/Users/UserListPage';
import ajax from './Shared/ajax';

const urlEndpoint = 'http://localhost:3001'

class App extends Component {
  state = {
    currentUser: {
      name: '',
      picture: '',
      role: ''
    }
  }

  componentWillReceiveProps = ({response: {success, data}}) => {
    if(!_.isEqual(data, this.props.data) && success) {
      this.setState({currentUser: data})
    }
  }

  getChildContext = () => { return {
    setCurrentUser: this.setCurrentUser,
    currentUser: this.state.currentUser,
    urlEndpoint
  }}

  setCurrentUser = ({name, picture, role}) => this.setState({currentUser: {name, picture, role}})

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Route exact path="/" component={MemeListPage} />
          <Route exact path="/users" component={UserListPage} />
          <Route exact path="/users/:id" component={UserEditPage} />
          <Route exact path="/users/:id/memes" component={MemeListPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/password" component={UpdatePasswordPage} />
          <Route path="/forgot_password" component={ForgotPasswordPage} />
        </div>
      </BrowserRouter>
    )
  }
}
App.childContextTypes = {
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  urlEndpoint: PropTypes.string
};

export default ajax({
  url: 'http://localhost:3001/users/validate_token',
  loadOnMount: !!cookie.load('authorization')
})(App)
