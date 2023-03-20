
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/callHistoryDB',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})