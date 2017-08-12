import { Icon, Image, Item, Menu as SemanticMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import PropTypes from 'prop-types'

const UnsignedMenu = () => (
  <SemanticMenu.Menu position='right'>
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
  </SemanticMenu.Menu>
)

const SignedMenu = ({name, picture, role, urlEndpoint}) => (
  <SemanticMenu.Menu position='right'>
    <Item>
      <Image avatar src={urlEndpoint+picture} />
      {name} - {role}
    </Item>
  </SemanticMenu.Menu>
)

const Menu = (props, {currentUser: {name, picture, role}, urlEndpoint}) => (
  <SemanticMenu>
    <Item name='home'>
      <Link to="/">
        <Icon name='home' />
        Memes
      </Link>
    </Item>
    {!!name? <SignedMenu {...{name, picture, role, urlEndpoint}} /> : <UnsignedMenu /> }
  </SemanticMenu>
)

Menu.contextTypes = {
  currentUser: PropTypes.object,
  urlEndpoint: PropTypes.string
}
export default Menu
