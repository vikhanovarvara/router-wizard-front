import React, { FocusEventHandler, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';
import { PhoneInput } from 'shared/ui/input/phone/PhoneInput';

type Props = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
  sx?: SxProps;
  endAdornment?: ReactNode;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function HFPhoneInput({ name, defaultValue, helperText, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message?.toString();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref: _ref, ...rest } }) => (
        <PhoneInput {...rest} isError={!!errors[name]} helperText={helperText || errorText} {...props} />
      )}
    />
  );
}
