import { createSx } from 'themes';

export const sx = createSx({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  toolbar: {
    display: 'flex',

    gap: '15px',

    alignItems: {
      sm: 'center',
    },
    justifyContent: {
      sm: 'space-between',
    },
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  actions: {},
  table: { minWidth: 650 },
  head: {},
  cell: {
    padding: '14px',
  },
  headCell: {
    fontSize: '12px',
    fontWeight: 600,
  },
  bodyCell: {
    fontSize: '14px',
  },
  tabs: {
    padding: '0 16px',
  },
});

export default sx;
