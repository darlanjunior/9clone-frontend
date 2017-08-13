import { Table } from 'semantic-ui-react';
import React from 'react';

import User from './User';

export default ({users, reload}) => <Table celled structured>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell rowSpan='2'>User</Table.HeaderCell>
      <Table.HeaderCell rowSpan='2'>Role</Table.HeaderCell>
      <Table.HeaderCell colSpan='3'>Actions</Table.HeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell>Posts</Table.HeaderCell>
      <Table.HeaderCell>Edit</Table.HeaderCell>
      <Table.HeaderCell>Remove</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {users.map(u => <User key={u.email} callback={reload} {...u} />)}
  </Table.Body>
</Table>
