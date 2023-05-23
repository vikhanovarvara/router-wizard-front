import * as yup from 'yup';

export const getValidationSchema = () =>
  yup.object().shape({
    name: yup.string().required('Введите Ф. И. О.'),
    email: yup.string().required('Введите email'),
    phone: yup.string().required('Введите номер телефона'),
    router: yup.string().required('Введите модель роутера'),
    status: yup.string().required('Выберите статус заявки'),
    address: yup.string().required('Введите адрес'),
    description: yup.string().nullable(),
  });
