const Contact = require("./contactSchema");


const getAllContacts = () => { // for developer use only
    return new Promise((resolve, reject) => {
        Contact.find((err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

const getContactById = (id) => {
    return new Promise((resolve, reject) => {
        Contact.findById(id, (error, contact) => {
            if (error) {
                reject(error);
            } else {
                resolve(contact);
            }
        });
    });
};

const getContactsPaginated = (page, searchText) => {
    return new Promise(async (resolve,reject) => {
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const results = {};

        const query = searchText ? {
            $or : [
                { name: { $regex: searchText, $options: 'i' } },
                { phoneNumber: { $regex: searchText, $options: 'i' } }
            ]
        } : {};

        const amount = await (Contact.find(query).countDocuments().exec());
        results.total = Math.ceil(amount/limit);

        try {
            let res = await (Contact.find(query)).limit(limit).skip(startIndex).exec();
            results.results = res;
            resolve(results);
            next();
        } catch (err) {
            reject(err);
        }
    });
};


const createNewContact = (contact) => {
    return new Promise((resolve, reject) => {
        let createdContact = new Contact(contact);
        createdContact.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(createdContact);
            }
        })
    });
};


const deleteContactById = (id) => {
    return new Promise((resolve, reject) => {
        Contact.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ msg: `contact with id ${id} deleted` })
            }
        })
    });
};

const updateContact = (id, update) => {
    return new Promise((resolve, reject) => {
        Contact.findByIdAndUpdate(id, update, { new: true }, (error, updated) => {
            if (error) {
                reject(error);
            } else {
                resolve(updated);
            }
        });
    });
};


module.exports = {
    updateContact,
    getContactById,
    getAllContacts,
    createNewContact,
    deleteContactById,
    getContactsPaginated,
};