import { FormControlLabel, SxProps } from '@mui/material';

import { Option } from 'types/common/option';

import { Box } from '../box/Box';
import { RadioButton } from './RadioButton';

export type RadioGroupProps = {
  selected: Option['value'];
  options: Option[];
  sx?: SxProps;
  onChange: (value: Option['value']) => void;
};

export function RadioGroup({ selected, options, sx, onChange }: RadioGroupProps) {
  return (
    <Box sx={sx}>
      {options.map(option => (
        <FormControlLabel
          key={option.value}
          checked={selected === option.value}
          value={option.value}
          control={<RadioButton />}
          label={option.label}
          onChange={() => onChange(option.value)}
        />
      ))}
    </Box>
  );
}
