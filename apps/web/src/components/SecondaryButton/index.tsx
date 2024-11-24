import React, { FC, MouseEvent, ReactElement } from 'react';
import { Button } from '@mantine/core';

import classes from './index.module.css';

interface ButtonProps {
  children: ReactElement | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SecondaryButton: FC<ButtonProps> = ({ children, onClick }) => (
  <Button className={classes.secondary} onClick={onClick}>
    {children}
  </Button>
);

export default SecondaryButton;
