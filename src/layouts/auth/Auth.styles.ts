import { createSx } from 'themes';

export const sx = createSx({
  layout: {
    padding: {
      xs: '20px 0',
    },
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: 'calc(100% - 20px)',
  },
});

export default sx;
