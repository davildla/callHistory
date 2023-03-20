import React, {useState} from 'react';
import ModalTemplate from '../components/ModalComp';
import AddNewContactForm from '../forms/AddNewContactForm';
import { Button } from '@mui/material';

function AddContactModal() {
    const [open, setOpen] = useState(false);

    const makeTrigerBtn = (additionalProps) => {

        return (
            <Button
                fullWidth  
                color='success'
                variant='contained'
                onClick={additionalProps.onClick}
            >
                הוסף משתמש
            </Button>
        )
        
    }

    return (
        <div>
            <ModalTemplate
                openController={{open, setOpen}}
                makeTrigerBtn={makeTrigerBtn}
                title='הוסף איש קשר' 
            >
                <AddNewContactForm closeModal={() => setOpen(false)}/>
            </ModalTemplate>
        </div>
    );
}

export default AddContactModal;