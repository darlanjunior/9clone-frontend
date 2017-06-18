import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Meme extends React.Component {
  render = () => (
    <Card centered>
      <Image src={`http://localhost:3001/${this.props.url}`} />
    </Card>
  )
}
