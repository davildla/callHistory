import React, { useState } from 'react';
import ModalTemplate from '../components/ModalComp';
import EditContactForm from '../forms/EditContactForm';
import { Button } from '@mui/material';
import {deleteContact} from '../pages/contacts/utils';


function EditUser({data}) {
    const [open, setOpen] = useState(false);

    const makeTrigerBtn = (additionalProps) => {

        return (
            <Button
                fullWidth
                color='warning'
                variant='outlined'
                onClick={additionalProps.onClick}
            >
                ערוך משתמש
            </Button>
        )

    }

    const handleDelete = () => {
        let input = prompt('הקש "מחק" על מנת להמשיך');

        if (input === "מחק") deleteContact(data._id);

        setOpen(false);
    }

    return (
        <div>
            <ModalTemplate
                openController={{ open, setOpen }}
                makeTrigerBtn={makeTrigerBtn}
                title='ערוך איש קשר'
            >
                <br/>
                <Button
                    fullWidth
                    color='error'
                    variant='contained'
                    onClick={handleDelete}
                >
                    מחק משתמש
                </Button>
                <br/><br/>
                <hr/><br/>

                <EditContactForm closeModal={() => setOpen(false)} {...data}/>

            </ModalTemplate>
        </div>
    );
}

export default EditUser;