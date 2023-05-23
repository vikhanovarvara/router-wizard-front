import { ReactNode } from 'react';

import { Paper } from 'shared/ui/paper/Paper';
import { Typography } from 'shared/ui/typography/Typography';

import sx from './Wrapper.styles';

type AuthFormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function AuthFormWrapper({ title, children }: AuthFormWrapperProps) {
  return (
    <Paper sx={sx.wrapper}>
      <Typography variant='h5'>{title}</Typography>

      {children}
    </Paper>
  );
}
