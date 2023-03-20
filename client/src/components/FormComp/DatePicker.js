import React from 'react';
import { Field } from 'formik';
import { he } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, FormControl, FormLabel, FormHelperText } from '@mui/material';

function DatePicker(props) {
    const { label, name, fullWidth, ...rest } = props;
    return (
        <Field name={name}>
            {
                ({field, form}) => {
                    const { setFieldValue } = form;
                    const { value } = field;

                    return <FormControl error={form.errors[name] && form.touched[name]} fullWidth={fullWidth}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <LocalizationProvider adapterLocale={he} dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                id={name} 
                                {...field} 
                                {...rest} 
                                value={value} 
                                ampm={false}
                                disableMaskedInput
                                onChange={ val => { 
                                    if (val) {
                                        setFieldValue(name, val.getTime() /* i want to save date timestamp */)
                                    }
                                } }
                                renderInput={
                                    (params) => <TextField 
                                        {...params} 
                                        autoComplete='off'
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: "תאריך ושעה"
                                        }}
                                    />
                                }
                            />
                        </LocalizationProvider>
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

export default DatePicker;