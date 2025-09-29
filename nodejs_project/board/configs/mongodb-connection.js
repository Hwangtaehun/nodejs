const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://mymongo:Password@cluster0.vuoymoa.mongodb.net/test";

module.exports = function (callback){
    return MongoClient.connect(uri, callback);
};