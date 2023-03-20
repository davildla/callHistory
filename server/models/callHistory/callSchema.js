const mongoose = require('mongoose');

const callSchema = mongoose.Schema;

const call = new callSchema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    direction: { type: String, required: true },
    date: { type: Date, required: true, default : new Date() },
});

module.exports = mongoose.model('call', call);