const mongoose = require('mongoose');

const databaseName = 'someDatabaseName';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
    useFindAndModify: false
};

mongoose.connect('mongodb://localhost:27017/myapp', options)
    .then(() => console.log("connected."))
    .catch((error) => console.log(`Error connecting to MongoDB ${error}`))

const ContactsSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const dbContacts = mongoose.model("contacts", ContactsSchema);

const add = async (body) => {
    const dbContact = new dbContacts({
        name: body.name,
        email: body.email,
        phone: body.phone,
    });
    return await dbContact.save()
}

const get = async () => {
    return await dbContacts.find({})
}

const getById = async (contactId) => {
    return await dbContacts.findById(contactId)
}

const removeById = async (contactId) => {
    await dbContacts.findByIdAndDelete(contactId)
}

const updateById = async (contactId, body) => {
    return await dbContacts.findByIdAndUpdate(contactId, body)
}

module.exports = {add, get, getById, removeById, updateById}
