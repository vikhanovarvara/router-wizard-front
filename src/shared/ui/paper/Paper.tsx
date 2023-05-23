import { Paper as MUIPaper, PaperProps as MUIPaperProps } from '@mui/material';

import paperSx from './Paper.styles';

type PaperProps = Pick<MUIPaperProps, 'children' | 'sx' | 'elevation'>;

export function Paper({ children, sx, elevation = 0 }: PaperProps) {
  return (
    <MUIPaper elevation={elevation} sx={{ ...paperSx.wrapper, ...sx }}>
      {children}
    </MUIPaper>
  );
}
