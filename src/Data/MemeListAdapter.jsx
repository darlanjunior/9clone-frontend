import React from 'react'
import API from '../Shared/API'
import MemeList from '../Web/MemeList'

export default class MemeListAdapter extends React.Component {
  shouldComponentUpdate(props) {
    if(!props.showForm && this.props.showForm) return true;
    return false
  }

  render = () => (
    <API url={'/memes'}>
      <MemeList />
    </API>
  )
}
