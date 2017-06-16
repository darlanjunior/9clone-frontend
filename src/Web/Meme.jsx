import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Meme extends React.Component {
  render = () => (<div><img src={this.props.url} alt=""/><Button>Hai</Button></div>)
}
