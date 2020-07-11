import * as yup from 'yup';
import { I18nManager } from 'react-native';

const {isRTL} = I18nManager;
//Validation Schema
export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(!isRTL?'Name is Required':"ادخل الأسم.")
    .min(3, !isRTL?'Name is too small':"الاسم صغير جدا.")
    .max(40, !isRTL?'Name is too big':"الأسم كبير جدا.")
    .label('name'),

    // age:yup
    // .number(!isRTL?strings.ageValidation.wrongAge:"العمر غير صحيح")
    // .typeError(!isRTL?strings.ageValidation.wrongAge:"العمر غير صحيح")
    // .min(1,!isRTL?strings.ageValidation.required:"ادخل العمر.")
    // .required(!isRTL?strings.ageValidation.required:"ادخل العمر."),

  email: yup
    .string()
    .required(!isRTL?'Email is Required':"ادخل الايميل.")
    .email(!isRTL?"Invalid Email address":"الأيميل غير صحيح.")
    .label('email'),

    password: yup
    .string()
    .required(!isRTL?"Password is required":"ادخل الرقم السري.")
    .min(6, !isRTL?'Password is too small':"الرقم السري صغير جدا.")
    .max(25, !isRTL?'Password is too big':"الرقم السري كبير جدا.")
    .label('password'),

    confirmPassword: yup
    .string()
    .required(!isRTL?"Enter password again":"ادخل الرقن السري مره اخري.")
    .test('password-match', !isRTL?'Password doesnt match.':"غير مطابق", function (value) {
        return this.parent.password === value;
      })
    .label('Confirm Password'),
});

// const regExp = /\b\d{2}\b/;

//Validation Schema
// export const validationSignIn = yup.object().shape({
//   age: yup
//   .string().matches(regExp, {message:!isRTL? strings.signinValidationMessages.minrequired:"رقم الهويه يجب ان لا يقل عن 2 ارقام", excludeEmptyString: true})
//   // .number(strings.signinValidationMessages.number)
//   // .min(0)
//   // .typeError(strings.signinValidationMessages.number)
//   // .test('len', strings.signinValidationMessages.minrequired, val => val && val.toString().length === 10)
//   .required(!isRTL? strings.signinValidationMessages.required:'رقم الهويه يجب ان يكون ١٠ ارقام'),
// });

