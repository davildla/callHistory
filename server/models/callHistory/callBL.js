const Call = require("./callSchema");


const getAllCalls = () => { // for developer use only
    return new Promise((resolve, reject) => {
        Call.find((err, data) => {
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

const getCallById = (id) => {
    return new Promise((resolve, reject) => {
        Call.findById(id, (error, call) => {
            if (error) {
                reject(error);
            } else {
                resolve(call);
            }
        });
    });
};

const getCallsPaginated = (page, searchText) => {
    return new Promise(async (resolve,reject) => {
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const results = {};

        const query = searchText ? {
            $or : [
                { from: { $regex: searchText, $options: 'i' } },
                { to: { $regex: searchText, $options: 'i' } }
            ]
        } : {};

        const amount = await (Call.find(query).countDocuments().exec());
        results.total = Math.ceil(amount/limit);

        try {
            let res = await (Call.find(query)).limit(limit).skip(startIndex).exec();
            results.results = res;
            resolve(results);
            next();
        } catch (err) {
            reject(err);
        }
    });
};

const createNewCall = (call) => {
    return new Promise((resolve, reject) => {
        let createdCall = new Call(call);
        createdCall.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(createdCall);
            }
        })
    });
};

const deleteCallById = (id) => {
    return new Promise((resolve, reject) => {
        Call.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ msg: `Call with id ${id} deleted` })
            }
        })
    });
};

const updateCall = (id, update) => {
    return new Promise((resolve, reject) => {
        Call.findByIdAndUpdate(id, update, { new: true }, (error, updated) => {
            if (error) {
                reject(error);
            } else {
                resolve(updated);
            }
        });
    });
};


module.exports = {
    updateCall,
    getCallById,
    getAllCalls,
    createNewCall,
    deleteCallById,
    getCallsPaginated,
};