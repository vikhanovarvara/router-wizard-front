import { createSx } from 'themes';

export const sx = createSx({
  btn: {
    boxShadow: 'none',
    gap: '5px',

    '&:hover': {
      boxShadow: 'none',
    },
  },
});

export default sx;
