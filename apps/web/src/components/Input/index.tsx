import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

import classes from './index.module.css';

const Input: FC<TextInputProps> = (allProps) => {
  const { ...props } = allProps;

  return (
    <TextInput
      {...props}
      onChange={props.onChange}
      classNames={{
        label: classes.label,
        input: classes.input,
      }}
    />
  );
};

export default Input;
