import { createSx } from 'themes';

import vv from '../../assets/vv.jpg';

const sx = createSx({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',

    background: `url(${vv})`,

    gap: {
      md: '50px',
      sm: '40px',
      xs: '30px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    maxWidth: '1200px',

    padding: {
      xs: '0 10px',
      sm: '0 20px',
    },

    gap: {
      sm: '20px',
      xs: '10px',
    },
  },
});

export default sx;
