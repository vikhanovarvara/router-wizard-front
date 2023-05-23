import { Checkbox, FormControlLabel, SxProps } from '@mui/material';

import { Option } from 'types/common/option';

import { Box } from '../box/Box';

export type CheckboxGroupProps = {
  selected: Option['value'][];
  options: Option[];
  sx?: SxProps;
  onChange: (value: Option['value']) => void;
};

export function CheckboxGroup({ selected, options, sx, onChange }: CheckboxGroupProps) {
  return (
    <Box sx={sx}>
      {options.map(option => (
        <FormControlLabel
          checked={selected.includes(option.value)}
          value={option.value}
          control={<Checkbox />}
          label={option.label}
          onChange={() => onChange(option.value)}
        />
      ))}
    </Box>
  );
}
