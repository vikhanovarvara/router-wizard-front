interface Props {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export function TabPanel({ children, value, index, ...other }: Props) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
