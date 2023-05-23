import React, { ElementType, ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUIButton from '@mui/material/Button';

import { ProgressCircular } from '../progress/ProgressCircular';

import btnSx from './Button.styles';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children?: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  component?: ElementType;
  fullWidth?: boolean;
  sx?: SxProps;
  form?: string | number;
  id?: string;
};

export function Button({
  variant = 'contained',
  component = 'button',
  color = 'primary',
  isLoading,
  sx,
  children,
  ...props
}: Props) {
  return (
    <MUIButton variant={variant} component={component} color={color} sx={{ ...sx, ...btnSx.btn }} {...props}>
      {children}
      {isLoading && <ProgressCircular color='inherit' size={15} />}
    </MUIButton>
  );
}
