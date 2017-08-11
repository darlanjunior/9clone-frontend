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
      </div>
    )
  }
}

export default MemeListPage
