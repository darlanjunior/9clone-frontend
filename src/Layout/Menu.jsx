import { Icon, Item, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react'

export default class MemeListPage extends React.Component {
  render = () => (
    <Menu>
      <Item name='home'>
       <Link to="/"><Icon name='home' />
       Memes</Link>
      </Item>

      <Menu.Menu position='right'>

        <Item name='home'>
          <Link to="/login">
            <Icon name='sign in' />
            Login
          </Link>
        </Item>

        <Item>
          <Link to="/register">
            <Icon name='add user' />
            Register
          </Link>
        </Item>

      </Menu.Menu>
    </Menu>
  )
}
