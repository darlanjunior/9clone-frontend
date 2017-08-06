import { FormInput } from 'react-form';
import { Input } from 'semantic-ui-react';
import React from 'react';

const value = ({target: {type, value, files}}) => (
  type === 'file' ? files[0] : value
)

export default ({field, ...props}) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <Input
        {...props}
        value={props.type === 'file' ? undefined : getValue()}
        onChange={(e) => setValue(value(e))}
        onBlur={() => setTouched()} />
    )}
  </FormInput>
)
