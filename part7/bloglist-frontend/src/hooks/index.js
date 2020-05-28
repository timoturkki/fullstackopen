import { useState } from 'react';

export const useField = (type, name, id = name) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const attr = {
    type,
    value,
    onChange,
    id,
    name,
  };

  const reset = () => {
    setValue('');
  };

  return {
    attr,
    reset,
  };
};