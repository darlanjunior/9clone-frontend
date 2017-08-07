import React from 'react'
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react'

const Meme = ({url, title}, {urlEndpoint}) => (
  <div style={{maxWidth: '600px', margin: 'auto', marginBottom: '20px'}}>
    <Card centered fluid>
      <Image centered height='500px' src={`${urlEndpoint}/${url}`} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
      </Card.Content>
    </Card>
  </div>
)

Meme.contextTypes = {
  urlEndpoint: PropTypes.string
};

export default Meme;
