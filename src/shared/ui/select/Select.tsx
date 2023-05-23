import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';

import { Option } from 'types/common/option';

import { Box } from '../box/Box';
import { Typography } from '../typography/Typography';

type Props = {
  onChange: (value: Option['value']) => void;
  value?: Option['value'];
  error?: string;
  isError?: boolean;
  options: Option[];
  isDisabled?: boolean;
  label?: string;
  sx?: SxProps;
  selectSx?: SxProps;
  size?: 'small' | 'medium';
};

export function Select({ value, options, error, isError, label, sx, selectSx, isDisabled, size, onChange }: Props) {
  const change = (event: SelectChangeEvent) => {
    const targetValue = event.target.value;
    onChange(targetValue);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id='select-label'>{label}</InputLabel>

        <MUISelect
          labelId='select-label'
          sx={selectSx}
          value={value}
          label={label}
          error={isError}
          disabled={isDisabled}
          onChange={change}
          size={size}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>

      {error && (
        <Typography variant='caption' color='error'>
          {error}
        </Typography>
      )}
    </Box>
  );
}
