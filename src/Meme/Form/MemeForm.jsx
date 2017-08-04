import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class MemeForm extends React.Component {
  onChange(e) {
    const name = e.target.name
    const val = (name === 'file')?
      e.target.files[0] : e.target.value

    this.props.updateValue(name, val);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit();
  }

  render() {
    return <Form
      success
      warning
      error
      loading={this.props.loading}
      onSubmit={(e) => this.onSubmit(e)}>
    <Form.Input
      label='Title'
      name='title'
      placeholder='Title'
      onChange={(e) => this.onChange(e)}/>
    <Form.Input
      label='Image'
      name='file'
      placeholder='Image'
      type='file'
      onChange={(e) => this.onChange(e)}/>
    <Button type='submit'>Submit</Button>
  </Form>
  }
}
