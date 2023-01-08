import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Min length 3')
    .max(20, 'Max length 20')
    .required('Enter name'),
  email: yup.string().required().email('Enter valid email'),
  age: yup.number('Age should be a number').required('Enter age'),
  password: yup.string().required('Enter password').min(5, 'Min length 5'),
  passwordConfirmation: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  tos: yup.required().bool().oneOf([true], 'Yuu must agree with terms'),
});

export default {
  install(app, options) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
  },
};
