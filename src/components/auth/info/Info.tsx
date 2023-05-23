import { Box } from 'shared/ui/box/Box';
import { Typography } from 'shared/ui/typography/Typography';

import sx from './Info.styles';

export function AuthInfo() {
  return (
    <Box sx={sx.wrapper}>
      <Typography variant='h2' sx={sx.title}>
        Router
        <br />
        Wizard
      </Typography>
    </Box>
  );
}
