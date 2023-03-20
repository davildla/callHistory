import React from 'react';
import { Field } from 'formik';
import { TextField, FormControl, FormLabel, FormHelperText } from '@mui/material';

function Input(props) {
    const { label, name, fullWidth, ...rest } = props;
    return (
        <Field name={name}>
            {
                ({field, form}) => {
                    return <FormControl error={form.errors[name] && form.touched[name]} fullWidth={fullWidth}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <TextField id={name} {...rest} {...field} error={form.errors[name] && form.touched[name]}/>
                        {
                            form.errors[name] && form.touched[name] ? (
                                <FormHelperText error >{form.errors[name]}</FormHelperText>
                            ) : null
                        } 
                    </FormControl>
                }
            }
        </Field>
    );
}

export default Input;