import React from 'react';
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';

function ChoseFileBtn(props) {
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <div>
            <label htmlFor="contained-button-file">
                <Input  id="contained-button-file" multiple type="file" onChange = {
                    (e) => {
                        const file = e.target.files[0];
                        if (props.onFileSelected) props.onFileSelected(file);
                    }
                }/>
                <Button variant="contained" component="span" fullWidth>
                    {props.title}
                </Button>
            </label>
        </div>
    );
}

export default ChoseFileBtn;