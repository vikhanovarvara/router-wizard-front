import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from 'shared/ui/box/Box';
import { Button } from 'shared/ui/button/Button';

import { HFTextField } from 'components/hook-form/HFTextField';
import { HFPassField } from 'components/hook-form/pass-field/HFPassField';

import { SignInDto } from 'types/dto/auth/sign-in.dto';

import { AuthFormWrapper } from '../wrapper/Wrapper';
import schema from './validation';

import sx from './SignIn.styles';

type SignInFormProps = {
  isLoading?: boolean;
  defaultValues?: SignInDto;
  onSubmit: (data: SignInDto) => void;
};

export function SignInForm({ isLoading, defaultValues, onSubmit }: SignInFormProps) {
  const values = useForm<SignInDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submit = (data: SignInDto) => onSubmit(data);

  return (
    <AuthFormWrapper title='Авторизация'>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Box sx={sx.fields}>
            <HFTextField name='email' label='Почта' />
            <HFPassField name='password' label='Пароль' />

            <Button type='submit' isLoading={isLoading}>
              Войти
            </Button>
          </Box>
        </form>
      </FormProvider>
    </AuthFormWrapper>
  );
}
