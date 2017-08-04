import React from 'react'

import MemeForm from './Form/MemeForm';
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
          <MemeForm
            stopShowing={() => this.setState({showForm: false})}/> :
          null
      }
      <MemeList showForm={this.state.showForm}/>
    </div>
  }
}

export default MemeListPage
