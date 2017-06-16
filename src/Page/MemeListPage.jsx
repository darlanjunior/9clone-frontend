import React from 'react'
import MemeListAdapter from '../Data/MemeListAdapter'
import { Menu, Icon } from 'semantic-ui-react'

export default class MemeListPage extends React.Component {
  render() {
    return <div>
      <Menu top fixed>
        <Menu.Item name='home'>
         <Icon name='home' />
         Home
        </Menu.Item>
        <Menu.Item name='gamepad'>
         <Icon name='gamepad' />
         Games
        </Menu.Item>
      </Menu>
      <MemeListAdapter/>
    </div>
  }
}
