import { FormInput } from 'react-form';
import { Input } from 'semantic-ui-react';
import React from 'react';

export default ({field, ...props}) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <Input
        {...props}
        value={getValue()}
        onChange={(e, target) => setValue(target.value)}
        onBlur={() => setTouched()} />
    )}
  </FormInput>
)
