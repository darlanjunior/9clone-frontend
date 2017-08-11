import { withRouter } from 'react-router-dom';
import React from 'react';

import UserForm from './UserForm';

const redirect = role => role === 'Admin'? '/users' : '/'
const LoginForm = ({history}) => (
  <div>
    <h3>Login</h3>
    <UserForm
      fields={{
        email: 'text',
        password: 'password'
      }}
      afterSubmit={(response) => {
        if(response.success)
          history.push(redirect(response.data.role))
        else
          alert(response.errors)
      }} />
  </div>
)

export default withRouter(LoginForm)
