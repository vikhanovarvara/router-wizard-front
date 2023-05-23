import * as yup from 'yup';

type SchemaParams = {
  withPassword?: boolean;
  withRole?: boolean;
};

export const getValidationSchema = ({ withPassword, withRole }: SchemaParams) =>
  yup.object().shape({
    name: yup.string().required('Введите Ф. И. О. пользователя'),
    email: yup.string().required('Введите email'),
    phone: yup.string().nullable(),
    role: withRole ? yup.string().required('Выберите роль') : yup.string().nullable(),
    password: withPassword ? yup.string().required('Введите пароль') : yup.string().nullable(),
  });
