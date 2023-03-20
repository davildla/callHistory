const mongoose = require('mongoose');

const contactSchema = mongoose.Schema;

const contact = new contactSchema({
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('contact', contact);