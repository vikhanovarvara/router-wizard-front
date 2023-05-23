import { RefObject } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { HFPhoneInput } from 'components/hook-form/HFPhoneInput';
import { HFSelect } from 'components/hook-form/HFSelect';
import { HFTextField } from 'components/hook-form/HFTextField';
import { HFPassField } from 'components/hook-form/pass-field/HFPassField';

import { UserCreateDto } from 'types/dto/user/create.dto';
import { UserUpdateDto } from 'types/dto/user/update.dto';

import { roleOptions } from 'constants/role';

import { getValidationSchema } from './validation';

import sx from './BasicForm.styles';

export type UserBasicFormDto = UserCreateDto | Omit<UserUpdateDto, 'uuid'>;

export type UserBasicFormProps = {
  submitBtnRef: RefObject<HTMLButtonElement>;
  defaultValues?: UserBasicFormDto;
  onSubmit: (data: UserBasicFormDto) => void;
};

export function UserBasicForm({ submitBtnRef, defaultValues, onSubmit }: UserBasicFormProps) {
  const isCreate = !defaultValues;

  const schema = getValidationSchema({ withPassword: isCreate, withRole: isCreate });

  const values = useForm<UserBasicFormDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)} style={sx.form}>
        <HFTextField name='name' label='Ф. И. О. пользователя' />

        <HFTextField name='email' label='Email' />

        <HFPhoneInput name='phone' label='Телефон' />

        {isCreate && <HFSelect options={roleOptions} name='role' label='Роль' />}

        {isCreate && <HFPassField name='password' label='Пароль' autoComplete='new-password' />}

        <button type='submit' ref={submitBtnRef} style={{ display: 'none' }}>
          {}
        </button>
      </form>
    </FormProvider>
  );
}
