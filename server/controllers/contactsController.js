const express = require('express');
const router  = express.Router();
const contactBL = require('../models/contacts/contactBL');


router.route('/get-all').get(async (req,resp)=>{

    resp.json(await contactBL.getAllContacts());
});

router.route('/list-contacts').get(async (req,resp)=>{

    const {page, searchText} = req.query;

    try {
        const result = await contactBL.getContactsPaginated(page, searchText);
        resp.json(result);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/get-contact-data/:id').get(async (req,resp)=>{
    const { id } = req.params;
    try {
        const contactData = await contactBL.getContactById(id);
        if (contactData) {
            resp.json(contactData);
        } else {
            resp.status(404).json({ message: 'contact not found' });
        }
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/add-contact').post(async (req,resp)=>{

    const {name, phoneNumber} = req.body;

    if (!(name && phoneNumber)) {
        resp.status(400).json({ message: 'Missing required fields: "name" or "phoneNumber"' });
        return;
    } 

    try {
        const contact = await contactBL.createNewContact(req.body);
        resp.status(201).json(contact);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/update-contact/:id').put(async (req, resp) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const updatedContact = await contactBL.updateContact(id, update);

        resp.json(updatedContact);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/delete-contact/:id').delete(async (req,resp)=>{

    const { id } = req.params;
    try {
        await contactBL.deleteContactById(id);

        resp.json({ message: `contact with id ${id} deleted` });

    } catch (error) {
        console.log({ message: error.message });
        resp.status(500).json({ message: error.message });
    }
});


module.exports = router;
