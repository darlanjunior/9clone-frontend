import {Button, Form as FormTag} from 'semantic-ui-react'
import { Form as ReactForm } from 'react-form';
import React from 'react'

import Input from '../../Shared/Input';
import ajax from '../../Shared/ajax';

class MemeForm extends React.Component {
  render() {
    return (
      <ReactForm
        onSubmit={(e) => {
          this.props.stopShowing()
          this.props.reload(e, 'post')
        }}>
        {({submitForm}) => (
          <FormTag onSubmit={submitForm}>
            <Input
              type='text'
              label='Title'
              placeholder='Title'
              field='title'/>
            <Input
              type='file'
              label='Meme'
              field='file'
              placeholder='Image'/>
            <Button type='submit'>Submit</Button>
          </FormTag>
        )}
      </ReactForm>
    )
  }
}

export default ajax({
  url: '/memes',
  loadOnMount: false
})(MemeForm)
