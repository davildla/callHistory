
const mongoose = require('mongoose');

const password = process.env.ATLAS_PASSWORD;

mongoose.connect(`mongodb+srv://davidticcenter:${password}@cluster0.dwev9sv.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})