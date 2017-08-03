import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default class MemeListPage extends React.Component {
  render = () => (
    <Menu>
      <Menu.Item name='home'>
       <Icon name='home' />
       Home
      </Menu.Item>
      <Menu.Item name='gamepad'>
       <Icon name='gamepad' />
       Games
      </Menu.Item>
      <Menu.Item name='add square' position='right'>
       <Icon name='add square' onClick={this.props.onClick}/>
       New
      </Menu.Item>
    </Menu>
  )
}
