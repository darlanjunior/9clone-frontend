import React from 'react'
import Meme from './Meme'

export default class MemeList extends React.Component {
  render() {
    return <div>{(this.props.response.urls).map(url => <Meme key={url} url={url} />)}</div>
  }
}
