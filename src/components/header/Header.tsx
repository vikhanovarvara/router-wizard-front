import Image from 'next/image';
import React from 'react';

import { AppBar, Container, Grid, SxProps } from '@mui/material';

import { IconButton } from 'shared/ui/icon-button/IconButton';
import { LinkRef } from 'shared/ui/link/Link';

import headerSx from './Header.styles';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import RouterIcon from '@mui/icons-material/Router';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from 'assets/logo.svg';

export type HeaderProps = {
  sx?: SxProps;
  withUsers?: boolean;
  onClickUsers(): void;
  onClickAppeals(): void;
  onClickSettings(): void;
  onClickSignOut(): void;
};

export function Header({ sx, withUsers, onClickUsers, onClickAppeals, onClickSettings, onClickSignOut }: HeaderProps) {
  return (
    <AppBar sx={{ ...headerSx.container, ...sx } as SxProps}>
      <Container sx={{ height: '100%', position: 'relative' }} maxWidth='lg'>
        <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
          <Grid item xs={2} md={4} lg={6} container direction='row' alignItems='center' justifyContent='flex-start'>
            <LinkRef sx={headerSx.logo} href='/'>
              <Image src={Logo} height={50} width={50} alt='' />
            </LinkRef>
          </Grid>

          <Grid
            item
            xs={10}
            md={8}
            lg={6}
            container
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            sx={{ gap: '20px' }}
          >
            <IconButton onClick={onClickAppeals} color='inherit' sx={headerSx.icon}>
              <RouterIcon />
            </IconButton>

            {withUsers && (
              <IconButton onClick={onClickUsers} color='inherit' sx={headerSx.icon}>
                <PersonIcon />
              </IconButton>
            )}

            <IconButton onClick={onClickSettings} color='inherit' sx={headerSx.icon}>
              <SettingsIcon />
            </IconButton>

            <IconButton onClick={onClickSignOut} color='inherit' sx={headerSx.icon}>
              <LogoutIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
