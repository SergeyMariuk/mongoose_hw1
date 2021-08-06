const express = require('express');
const contactsController = require('./controllers');

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getContactsController)
contactsRouter.get('/:contactId', contactsController.getContactsByIdController)
contactsRouter.post('/', contactsController.createContactController)
contactsRouter.delete('/:contactId', contactsController.removeContactController)
contactsRouter.patch('/:contactId', contactsController.updateContactController)

module.exports = contactsRouter;