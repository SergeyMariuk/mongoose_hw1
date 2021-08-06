require('dotenv').config();
const express = require('express');
const carsRouter = require('./modules/contacts/routes');
const app = express();

// CORS.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next()
})

// Json body parser.
app.use(express.json());

// app.use('api/contacts', contactsRouter)
app.use('/api/contacts', carsRouter)

//Run server.
app.listen(process.env.PORT, () => {
    console.log('Server started on port: '+ process.env.PORT)
})
