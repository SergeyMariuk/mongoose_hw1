const {add, get, getById, removeById, updateById} = require('./cont'); 


class ContactsControllers{
    async getContactsController(req, res){
        const contacts = await get();
        res.json(contacts)
    }

    async getContactsByIdController(req, res){
        const {contactId} = req.params;
        try{
            await getById(contactId)
        } catch (CastError){
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        const contact = await getById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        res.json(contact)
    }

    async createContactController(req, res){
        const {name, email, phone} = req.body;
        if(!name || !email || !phone){
            res.status(400).json({message: 'Missing required name field'})
            return;
        }
        const newContact = await add(req.body)
        res.status(201).json(newContact);
    }

    async removeContactController(req, res){
        const {contactId} = req.params;
        try{
            await getById(contactId)
        } catch (CastError){
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        const contact = await getById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        removeById(contactId)
        res.status(200).json({message: 'Сontact deleted'});

    }

    async updateContactController(req, res){
        const {contactId} = req.params;
        try{
            await getById(contactId)
        } catch (CastError){
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        const contact = await getById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        if(!Object.keys(req.body).length){
            res.status(400).json({message: 'Missing fields'})
            return;
        }
        await updateById(contactId, req.body)
        const Updatedcontact = await getById(contactId)
        res.json(Updatedcontact);
    } 
}

module.exports = new ContactsControllers();