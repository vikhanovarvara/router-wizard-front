import { RefObject } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { HFPhoneInput } from 'components/hook-form/HFPhoneInput';
import { HFSelect } from 'components/hook-form/HFSelect';
import { HFTextField } from 'components/hook-form/HFTextField';

import { AppealCreateDto } from 'types/dto/appeal/create.dto';
import { AppealUpdateDto } from 'types/dto/appeal/update.dto';

import { statusOptions } from 'constants/status';

import { getValidationSchema } from './validation';

import sx from './BasicForm.styles';

export type AppealBasicFormDto = AppealCreateDto | AppealUpdateDto;

export type AppealBasicFormProps = {
  submitBtnRef: RefObject<HTMLButtonElement>;
  defaultValues?: AppealBasicFormDto;
  onSubmit: (data: AppealBasicFormDto) => void;
};

export function AppealBasicForm({ submitBtnRef, defaultValues, onSubmit }: AppealBasicFormProps) {
  const schema = getValidationSchema();

  const values = useForm<AppealBasicFormDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)} style={sx.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <HFTextField name='name' label='Ф. И. О.' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HFTextField type='email' name='email' label='Email' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HFPhoneInput name='phone' label='Телефон' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HFTextField name='router' label='Модель роутера' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HFTextField name='address' label='Адрес' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HFSelect options={statusOptions} name='status' label='Статус' />
          </Grid>
          <Grid item xs={12}>
            <HFTextField multiline rows={3} name='description' label='Описание' />
          </Grid>
        </Grid>

        <button type='submit' ref={submitBtnRef} style={{ display: 'none' }}>
          {}
        </button>
      </form>
    </FormProvider>
  );
}
