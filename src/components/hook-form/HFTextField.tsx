import React, { ChangeEvent, FocusEventHandler, ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { InputBaseProps, InputProps, SxProps } from '@mui/material';

import { TextField } from 'shared/ui/text-field/TextField';

export type HFTextFieldProps = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  helperText?: string;
  type?: string;
  sx?: SxProps;
  disabled?: boolean;
  InputProps?: InputProps;
  endAdornment?: ReactElement;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  regexp?: RegExp;
  inputProps?: InputBaseProps['inputProps'];
  rows?: number;
  autoComplete?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const checkValidity = (event: ChangeEvent<HTMLInputElement>, regex: RegExp): boolean =>
  new RegExp(regex).test(event.currentTarget.value);

export function HFTextField({ name, defaultValue, helperText, onChange, regexp, ...props }: HFTextFieldProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const errorText = errors[name]?.message?.toString();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref: _ref, onChange: HFOnChange, ...rest } }) => (
        <TextField
          {...rest}
          onChange={event => {
            const isValid = !regexp || checkValidity(event, regexp);
            if (!isValid) {
              event.preventDefault();
              return;
            }

            clearErrors(name);

            HFOnChange(event);
            onChange?.(event);
          }}
          isError={!!errors[name]}
          helperText={helperText || errorText}
          {...props}
        />
      )}
    />
  );
}
