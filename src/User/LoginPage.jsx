import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types'

import UserForm from './UserForm';

const redirect = role => role === 'Admin'? '/users' : '/'
const LoginForm = ({history}, {setCurrentUser}) => (
  <div>
    <h3>Login</h3>
    <UserForm
      fields={{
        email: 'text',
        password: 'password'
      }}
      afterSubmit={(response) => {
        if(!response.success) {
          setCurrentUser(response.data)
          history.push(redirect(response.data.role))
        } else {
          alert(response.errors)
        }
      }} />
  </div>
)

LoginForm.contextTypes = {
  setCurrentUser: PropTypes.func
};

export default withRouter(LoginForm)
