import React from 'react';

import UserForm from '../UserForm';

export default () => <UserForm fields={{
  name: 'text',
  description: 'text',
  role: 'text',
  picture: 'file'
}}/>
