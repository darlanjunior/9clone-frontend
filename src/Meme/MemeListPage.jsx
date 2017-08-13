import { Button } from 'semantic-ui-react';
import React from 'react'

import MemeForm from './Form/MemeForm';
import MemeList from './List/MemeList';

class MemeListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      lastCreated: 0
    }
  }

  render() {
    const {showForm, lastCreated} = this.state

    return (
      <div>
        {
          showForm? <MemeForm
            finishCreating={() => this.setState({
              showForm: false,
              lastCreated: lastCreated+1
            })} /> : null
        }
        <MemeList lastCreated={lastCreated} />
        {showForm? null : <Button
          circular
          floated='right'
          icon='add'
          onClick={() => this.setState({showForm: true})}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px'
          }}/>}
      </div>
    )
  }
}

export default MemeListPage
