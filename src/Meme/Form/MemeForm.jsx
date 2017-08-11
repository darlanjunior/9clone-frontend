import {Button, Form as FormTag} from 'semantic-ui-react'
import { Form as ReactForm } from 'react-form';
import React from 'react'

import Input from '../../Shared/Input';
import ajax from '../../Shared/ajax';

class MemeForm extends React.Component {
  reloadList(meme) {
    const {reload, finishCreating} = this.props;

    return reload(meme, 'post')
      .then(({success, errors}) => {
        if(!success) throw new Error(errors)
        finishCreating(meme)
      })
      .catch(errors => alert(errors))
  }

  validate(params) {
    return {
      title: !params.title? 'Required' : undefined,
      file: !params.file? 'Required' : undefined
    }
  }

  render() {
    const {validate, reloadList} = this

    return (
      <ReactForm
        onSubmit={reloadList.bind(this)}
        validate={validate}>
        {({submitForm, errors}) => (
          <FormTag onSubmit={submitForm}>
            <Input
              error={!!errors && !!errors.title}
              type='text'
              label='Title'
              placeholder='Title'
              field='title'/>
            <Input
              error={!!errors && !!errors.file}
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
