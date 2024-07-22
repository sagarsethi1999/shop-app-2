const mongodb = require('mongodb');
const MongoCLient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {

    MongoCLient.connect('mongodb+srv://sagars:sagarhero143@sagars.gpcupps.mongodb.net/shop?retryWrites=true&w=majority&appName=sagars')
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err)
    });
};

const getDb = () => {
    if(_db){
        return _db;

    }
    throw 'No Database Found!!!';
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
