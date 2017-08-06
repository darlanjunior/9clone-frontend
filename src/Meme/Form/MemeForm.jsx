import {Button, Form as FormTag} from 'semantic-ui-react'
import { Form as ReactForm } from 'react-form';
import React from 'react'

import Input from '../../Shared/Input';
import ajax from '../../Shared/ajax';

class MemeForm extends React.Component {
  render() {
    return (
      <ReactForm
        onSubmit={(meme) => {
          const {reload, finishCreating} = this.props;
          reload(meme, 'post')
            .then(({success, errors}) => {
              if(!success) throw new Error(errors)
              finishCreating(meme)
            })
            .catch(errors => console.log(errors))
        }}>
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


/*
validate={({title, file}) => {
  return {
    title: !title? 'Required' : undefined,
    file: !file? 'Required' : undefined
  }
}}*/
