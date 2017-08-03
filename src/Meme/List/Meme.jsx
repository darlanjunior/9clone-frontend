import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default ({url, title}) => (
  <Card centered>
    <Image src={`http://localhost:3001/${url}`} />
    <Card.Content>
      <Card.Header>
        {title}
      </Card.Header>
    </Card.Content>
  </Card>
)
