import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';

import { Box } from 'shared/ui/box/Box';
import { Select } from 'shared/ui/select/Select';

import { Option } from 'types/common/option';

type Props = {
  name: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: Option['value'];
  type?: string;
  label?: string;
  sx?: SxProps;
  onChange?: (value: Option['value']) => void;
};

export function HFSelect({ name, defaultValue, sx, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message?.toString();

  return (
    <Box sx={sx}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field: { ref: _ref, onChange, ...rest } }) => (
          <Select
            {...rest}
            onChange={value => {
              if (props.onChange) props.onChange(value);
              else onChange(value);
            }}
            isError={!!errors[name]}
            error={errorText}
            {...props}
          />
        )}
      />
    </Box>
  );
}
