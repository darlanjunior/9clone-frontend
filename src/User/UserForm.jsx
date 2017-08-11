import {Button, Form as FormTag} from 'semantic-ui-react'
import { Form as ReactForm } from 'react-form';
import React from 'react';

import Input from '../Shared/Input';
import ajax from '../Shared/ajax';

const submit = (reload, afterSubmit, user) => {
  return reload(user, 'post').then(afterSubmit)
}

const validate = () => {

}

const inputFor = (field, errors, fieldType='text') => (
  <Input
    key={field}
    error={!!errors && !!errors[field]}
    type={fieldType}
    label={field.charAt(0).toUpperCase() + field.slice(1)}
    field={field} />
)

const UserForm = ({fields, afterSubmit, reload}) => {
  return <ReactForm
    onSubmit={submit.bind(this, reload, afterSubmit)}
    validate={validate}>
    {({submitForm, errors}) => (
      <FormTag onSubmit={submitForm}>
        {Object.keys(fields).map(field => inputFor(field, errors, fields[field]))}
        <Button type='submit'>Submit</Button>
      </FormTag>
    )}
  </ReactForm>
}

export default ajax({
  url: '/users/sign_in',
  loadOnMount: false
})(UserForm)

// username
// name
// description
// password
// password confirmation
// picture
