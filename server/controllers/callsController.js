const express = require('express');
const router  = express.Router();
const callBL = require('../models/callHistory/callBL');


router.route('/get-all').get(async (req,resp)=>{

    resp.json(await callBL.getAllCalls());
});

router.route('/list-calls').get(async (req,resp)=>{

    const {page, searchText} = req.query;

    try {
        const result = await callBL.getCallsPaginated(page, searchText);
        resp.json(result);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/get-call-data/:id').get(async (req,resp)=>{
    const { id } = req.params;
    try {
        const callData = await callBL.getCallById(id);
        if (callData) {
            resp.json(callData);
        } else {
            resp.status(404).json({ message: 'call not found' });
        }
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/add-call').post(async (req,resp)=>{

    try {
        const call = await callBL.createNewCall(req.body);
        resp.status(201).json(call);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/update-call/:id').put(async (req, resp) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const updatedcall = await callBL.updateCall(id, update);
        resp.json(updatedcall);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

router.route('/delete-call/:id').delete(async (req,resp)=>{

    const { id } = req.params;
    try {
        await callBL.deleteCallById(id);

        resp.json({ message: `call with id ${id} deleted` });

    } catch (error) {
        console.log({ message: error.message });
        resp.status(500).json({ message: error.message });
    }
});


module.exports = router;
