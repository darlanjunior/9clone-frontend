import React from 'react'
import MemeListAdapter from '../Data/MemeListAdapter'
import MemeFormAdapter from '../Data/MemeFormAdapter'
import Menu from '../Web/Menu'

export default class MemeListPage extends React.Component {
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
      <MemeListAdapter showForm={this.state.showForm}/>
    </div>
  }
}
