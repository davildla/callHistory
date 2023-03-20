import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl from './FormikControl';

// this component is an example of how to build a form with all of the reusable styled components
// and how to use Yup schema. 

function FormikContainer(props) {
    const dropdownOptions = [
        {key : 'בחר', value : ''},
        {key : 'אופציה 1', value : '1'},
        {key : 'אופציה 2', value : '2'},
        {key : 'אופציה 3', value : '3'},
    ]

    const radioOptions = [
        {key : 'אופציה 1', value : '1'},
        {key : 'אופציה 2', value : '2'},
        {key : 'אופציה 3', value : '3'},
    ]

    const checkboxOptions = [
        {key : 'אופציה 1', value : '1'},
        {key : 'אופציה 2', value : '2'},
        {key : 'אופציה 3', value : '3'},
    ]

    const initialValues = { 
        email : '',
        description : '',
        selectOption: '',
        radioOption : '',
        checkboxOption : [],
        birthDate : null, // or new Date(timestamp)
    };

    const validationSchema = Yup.object({
        // text field validate example
        email : Yup.string().email('מייל לא תקין').required('שדה חובה'),
        // textarea validate example
        description : Yup.string().required('שדה חובה'),
        // select validate example
        selectOption : Yup.string().required('שדה חובה'),
        // radio validate example
        radioOption : Yup.string().required('שדה חובה'),
        // array validate example
        checkboxOption : Yup.array().min(1, 'שדה חובה').required('שדה חובה'),
        // date validate example (when we send and get date as timestamp but display and validate it by date obj)
        birthDate : Yup.date().required('שדה חובה').transform((val, originalVal) => originalVal ? new Date(originalVal) : null).nullable(),
    });
    const onSubmit = values => console.log('Form data', values);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => <Form>
                    <FormikControl control='input' type='email' label='אימייל' name='email' size='small'/>
                    <br/>
                    <FormikControl control='textarea' label='תיאור' name='description' size='small'/>
                    <br/>
                    <FormikControl control='select' label='בחר אופציה' name='selectOption' options={dropdownOptions} size='small' fullWidth/>
                    <FormikControl control='radio' label='בחר אופציה' name='radioOption' options={radioOptions} />
                    <FormikControl control='checkbox' label='בחר אופציות' name='checkboxOption' options={checkboxOptions} />
                    <FormikControl control='date' label='בחר תאריך' name='birthDate' />
                    <button type='שלח'>Submit</button>
                </Form>
            }
        </Formik>
    );
}

export default FormikContainer;