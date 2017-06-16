import React from 'react'
import API from '../Shared/API'
import MemeList from '../Web/MemeList'

export default class MemeListAdapter extends React.Component {
  render = () => (
    <API url={'/memes'}>
      <MemeList />
    </API>
  )
}
