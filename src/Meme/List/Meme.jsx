import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default ({url, title}) => (
  <div style={{maxWidth: '600px', margin: 'auto', marginBottom: '20px'}}>
    <Card centered fluid>
      <Image centered height='500px' src={`http://localhost:3001/${url}`} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
      </Card.Content>
    </Card>
  </div>
)
