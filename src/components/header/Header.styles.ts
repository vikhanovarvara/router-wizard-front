import { createSx } from 'themes';

const sx = createSx({
  container: {
    position: 'relative',
    boxShadow: 'none',
    padding: {
      sm: '20px 0',
      xs: '10px 0',
    },
    background: 'none',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {},
});

export default sx;
