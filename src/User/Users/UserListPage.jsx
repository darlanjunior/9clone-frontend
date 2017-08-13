import { Container, Loader } from 'semantic-ui-react';
import React from 'react';

import UserList from './UserList';
import ajax from '../../Shared/ajax';

const UserListPage = ({response, reload}) => (
  <Container>
    <h3>User list</h3>
    <UserList users={response} reload={reload}/>
  </Container>
)

export default ajax({
  url: '/users',
  loadOnMount: true,
  loadingComponent: <Loader active>Loading</Loader>
})(UserListPage)
