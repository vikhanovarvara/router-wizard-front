import { ReactNode } from 'react';

import { PublicLayout } from 'layouts/public/Public';

import { Box } from 'shared/ui/box/Box';

import sx from './Auth.styles';

export interface AuthLayoutProps {
  children?: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <PublicLayout>
      <Box sx={sx.layout}>
        <Box sx={sx.container}>{children}</Box>
      </Box>
    </PublicLayout>
  );
}
