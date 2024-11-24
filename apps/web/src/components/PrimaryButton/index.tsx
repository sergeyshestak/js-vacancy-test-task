import React, { FC, MouseEvent, ReactElement } from 'react';
import { Button, ButtonProps } from '@mantine/core';

import classes from './index.module.css';

interface PrimaryButtonProps extends ButtonProps {
  children: ReactElement | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, type, disabled, ...props }) => (
  <Button {...props} type={type} className={classes.primary} onClick={onClick} disabled={disabled}>
    {children}
  </Button>
);

export default PrimaryButton;
