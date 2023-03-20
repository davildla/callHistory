import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import FormikControl from '../components/FormComp/FormikControl';

import { addContact } from '../pages/contacts/utils';

function AddNewContactForm({closeModal}) {


    const initialValues = { 
        name : '',
        phoneNumber : '',
    };

    const validationSchema = Yup.object({
        name : Yup.string().required('שדה חובה'),
        phoneNumber : Yup.string().required('שדה חובה'), // .matches(/.*\.git$/, 'יש לצרף את הסיומת : ".git"')
    });

    const onSubmit = async (values) => {
        closeModal();
        await addContact(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => <Form>
                    <FormikControl 
                        control='input' 
                        label='שם מלא' 
                        name='name' 
                        size='small'
                        fullWidth
                        autoComplete='off'
                        />
                    <br/><br/>
                    <FormikControl 
                        control='input' 
                        label='מספר טלפון' 
                        name='phoneNumber' 
                        size='small'
                        fullWidth
                        autoComplete='off'
                        style={{direction : 'ltr'}}
                    />
                    <br/><br/>
                    <Button fullWidth type='submit' color='success'>שמור</Button>
                </Form>
            }
        </Formik>
    );
}

export default AddNewContactForm;