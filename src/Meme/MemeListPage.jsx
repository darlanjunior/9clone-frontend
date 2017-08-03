import React from 'react'

import MemeFormAdapter from './Form/MemeFormAdapter';
import MemeList from './List/MemeList';
import Menu from '../Layout/Menu';

class MemeListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }
  }

  render() {
    return <div>
      <Menu onClick={() => this.setState({showForm: true})}/>
      {
        this.state.showForm?
          <MemeFormAdapter
            stopShowing={() => this.setState({showForm: false})}/> :
          null
      }
      <MemeList showForm={this.state.showForm}/>
    </div>
  }
}

export default MemeListPage
