import React from 'react';
import { Field } from 'formik';
import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';

function RadioButtons(props) {
    const { label, name, options, ...rest } = props;

    return (
        <Field name={name}>
            {
                ({field, form}) => {
                    return <FormControl error={form.errors[name] && form.touched[name]}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <RadioGroup name={name} {...field} {...rest}>
                            {
                                options.map((option, index) => {
                                    return <FormControlLabel 
                                        key={index}
                                        value={option.value} 
                                        control={<Radio />} 
                                        label={option.key} 
                                    />
                                })
                            }
                        </RadioGroup>
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

export default RadioButtons;