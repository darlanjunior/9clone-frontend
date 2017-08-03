import React from 'react'

import MemeForm from './MemeForm';

export default class MemeFormAdapter extends React.Component {
  state = { title: '', file: null, loading: false, response: {} }

  updateValue = (name, val) => this.setState({[name]: val})
  submit = () => {
    const { title, file } = this.state;
    const form = new FormData()
    form.append('title', title)
    form.append('file', file)

    this.setState({loading: true});
    fetch('http://localhost:3001/memes', {
      method: 'post',

      body: form
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        loading: false,
        response: json
      });
      this.props.stopShowing();
    })
  }

  render = () => <MemeForm
    updateValue={(name, val) => this.updateValue(name,val)}
    submit={() => this.submit()}
    {...this.state}
  />
}
