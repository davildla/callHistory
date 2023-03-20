import React from 'react';
import { Field } from 'formik';
import { FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';

function CheckboxGroup(props) {
    const { label, name, options, ...rest } = props;

    return (
        <Field name={name}>
            {
                ({field, form}) => {
                    return <FormControl error={(form.errors[name] && form.touched[name]) ? true : false}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <FormGroup {...field} {...rest}>
                            {
                                options.map((option, index) => {

                                    return <FormControlLabel 
                                        name={name}
                                        key={index}
                                        id={option.value}
                                        value={option.value} 
                                        control={<Checkbox />} 
                                        label={option.key} 
                                        checked={ field.value.includes(option.value) }
                                    />
                                })
                            }
                        </FormGroup>
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

export default CheckboxGroup;