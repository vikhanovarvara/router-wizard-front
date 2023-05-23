import { createSx } from 'themes';

export const sx = createSx({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default sx;
