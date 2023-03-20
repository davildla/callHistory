import React from 'react';
import { Field } from 'formik';
import { Select as MuiSelect } from '@mui/material';
import { MenuItem, FormControl, FormLabel, FormHelperText } from '@mui/material';

function Select(props) {
    const { label, name, options, fullWidth, ...rest } = props;
    return (
        <Field name={name}>
            {
                ({field, form}) => {
                    return <FormControl error={form.errors[name] && form.touched[name]} fullWidth={fullWidth}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <MuiSelect displayEmpty id={name} {...rest} {...field} error={form.errors[name] && form.touched[name]}>
                            {
                                options.map((option, index) => {
                                    return(
                                        <MenuItem key={index} value={option.value}>{option.key}</MenuItem>
                                    )
                                })
                            }
                        </MuiSelect>
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

export default Select;