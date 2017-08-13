import { Button, Header, Icon, Image, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import PropTypes from 'prop-types'

import RemoveButton from './RemoveButton'

const avatar = (picture, urlEndpoint) => !!picture? (
  <Image src={urlEndpoint+picture} shape='rounded' size='mini' />
) : <Icon name="user circle" />

const User = ({
  id,
  picture,
  name,
  email,
  role,
  callback,
  history
}, {urlEndpoint}) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4' image>
        {avatar(picture, urlEndpoint)}
        <Header.Content>
          {name}
          <Header.Subheader>{email}</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>
      {role}
    </Table.Cell>
    <Table.Cell>
      <Link to={`/users/${id}/memes`}>
        <Button icon='content' />
      </Link>
    </Table.Cell>
    <Table.Cell>
      <Link to={`/users/${id}`}>
        <Button icon='edit'/>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <RemoveButton id={id} callback={callback}/>
    </Table.Cell>
  </Table.Row>
)

User.contextTypes = {
  urlEndpoint: PropTypes.string
}

export default User;
