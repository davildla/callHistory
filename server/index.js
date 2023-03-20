require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let PORT = process.env.PORT || 8080;

require('./configs/database');

// controllers
const contactsController = require('./controllers/contactsController');
const callsController = require('./controllers/callsController');


app.use('/api/contacts', contactsController);
app.use('/api/calls', callsController);


app.listen(PORT, () => console.log(`listen on port ${PORT}`));


