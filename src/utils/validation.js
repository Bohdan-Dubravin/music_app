import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Min length 3')
    .max(20, 'Max length 20')
    .required('Enter name'),
  email: yup.string().required().email('Enter valid email'),
  age: yup.number('Age should be a number').required('Enter age'),
  password: yup.string().required('Enter password').min(6, 'Min length 6'),
  // passwordConfirmation: yup
  //   .string()
  //   .test('passwords-match', 'Passwords must match', function (value) {
  //     return this.parent.password === value
  //   }),
  country: yup.string().required(),
  tos: yup.string().required('You need to agree with terms'),
})

export const loginSchema = yup.object({
  email: yup.string().required().email('Enter valid email'),
  password: yup.string().required('Enter password').min(6, 'Min length 6'),
})

export const songSchema = yup.object({
  modifiedName: yup.string().required('Enter song name').min(5, 'Min length 5'),
  genre: yup.string().required('Enter genre').min(2, 'Min length 2'),
})

export default {
  install(app, options) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
  },
}
