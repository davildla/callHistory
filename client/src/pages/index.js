import React, { useState } from 'react';
import { Tab, Tabs, Container } from '@mui/material';
import CallsHistory from './callsHistory/CallsHistory';
import Contacts from './contacts/Contacts';

function MainView() {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Container>
            <br/>
            <Tabs value={tab} onChange={handleChange} centered variant="fullWidth">
                <Tab  label={<b>אחרונים</b>} />
                <Tab  label={<b>אנשי קשר</b>} />
            </Tabs>

            {
                tab === 0 ? <CallsHistory/> 
                :
                tab === 1 ? <Contacts/>
                :
                null
            }
        </Container>
    );
}

export default MainView;