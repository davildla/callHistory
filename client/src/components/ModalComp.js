import React, {useState} from 'react';
import {DialogContentText, DialogTitle, Container} from '@mui/material';
import {Dialog, DialogActions, DialogContent, Divider} from '@mui/material';


function ModalTemplate({title, content, openController, fullWidth, maxWidth, closeCallBack, makeTrigerBtn, ...rest}) {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        if(openController){ // if we got open and set open from parent use them
            openController.setOpen(true)
        } else { // use the default
            setOpen(true);
        }
    };

    const handleClose = () => {
        if(openController){
            openController.setOpen(false)
        } else {
            setOpen(false);
        }
        if (closeCallBack) closeCallBack();
    };
    return (
        <div>
            {makeTrigerBtn ? makeTrigerBtn({onClick : handleClickOpen}) : null}
        <Dialog
            open={openController ? openController.open : open}
            style ={{'direction' : 'rtl'}}
            fullWidth={fullWidth}
            onClose={handleClose}
            maxWidth={maxWidth}
        >
            {
                title ? (
                    <DialogTitle id="alert-dialog-title">
                            <div>
                                <b style={{float : 'right',  flexGrow: 1 }}>{title}</b>
                                <b style={{visibility : 'hidden'}}>________</b> {/* space between title to close btn */}
                                <b 
                                    title='סגור'
                                    style={{float : 'left', color : 'red', cursor  : 'pointer'}}
                                    onClick={handleClose}
                                >
                                    x
                                </b>
                            </div>
                    </DialogTitle>
                ) : null
            }
            <Divider/>
            {
                content ? (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                ) : null
            }

            <DialogActions> 
                <Container>
                    {rest.children}
                </Container>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default ModalTemplate;