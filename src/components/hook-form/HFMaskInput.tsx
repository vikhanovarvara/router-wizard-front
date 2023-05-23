import React, { FocusEventHandler, ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';
import { MaskInput, MaskInputProps } from 'shared/ui/input/mask/MaskInput';

export type Props = Pick<MaskInputProps, 'mask' | 'showMask' | 'inputProps' | 'margin'> & {
  name: string;

  defaultValue?: string;
  label?: string;
  helperText?: string;
  type?: string;
  sx?: SxProps;
  disabled?: boolean;
  endAdornment?: ReactElement;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  regexp?: RegExp;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function HFMaskInput({ name, mask, defaultValue, helperText, ...props }: Props) {
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
        <MaskInput {...rest} mask={mask} isError={!!errors[name]} helperText={helperText || errorText} {...props} />
      )}
    />
  );
}
