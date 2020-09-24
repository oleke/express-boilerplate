/*
 * Created on Tue Jun 23 2020
 *
 * Author: Ogunleke Abiodun
 * Copyright (c) 2020 ALLOFFT Inc
 */

const { MongoClient } = require('mongodb');
const {MONGO_URL,MONGO_DEV_URL} = require('./config');

const url = (process.env.NODE_ENV=="development")?MONGO_DEV_URL:MONGO_URL;
const mongo_DBNAME = "hackccent-backend";

/*
* A class wrapper to connect to MongoDB Database 
* Export the connection class to globally access the connection pool
*/
class Connection {

    //Check if DB is conneted
    static isConnected(){
        if(this.db)
            return true;
        return false;
    }

    
    //Synchronous Connection to MongoDB
    static connectToMongo() {
        if (this.db) return Promise.resolve(this.db);
        return MongoClient.connect(url, this.options)
            .then(client => this.db = client.db(mongo_DBNAME));
    }

    // Asynchronous Connection to MongoDB
    static async connectToMongoAsync() {
        if (this.db) return this.db;
        await MongoClient.connect(url, this.options)
        .then(client =>this.db = client.db(mongo_DBNAME));
        return this.db;
    }

    /*
    * Insert document into a collection
    * @collection: Collection name
    * @data: Document data
    * @callback: a callback function (err, result)
    */
    static async insertOne(collection, data, callback) {
        this.db.collection(collection).insertOne(data, function (err, result) {
            callback(err, result);
        });
    }


    /*
    * Update document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @data: Document data
    * @callback: a callback function (err, result)
    */
    static async updateOne(collection, key, data, callback) {
        this.db.collection(collection).updateOne(key, { $set: data, $currentDate: { lastModified: true } }, function (err, result) {
            callback(err, result);
        });
    }

        /*
    * Update document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @data: Document data
    * @callback: a callback function (err, result)
    */
   static async updateArray(collection, key, data,filter, callback) {
    this.db.collection(collection).updateOne(key, { $set: data, $currentDate: { lastModified: true } },{arrayFilters:[filter]}, function (err, result) {
        callback(err, result);
    });
}

      /*
    * Increment a field in a  document
    * @collection: Collection name
    * @key: The unique key of the document
    * @data: Document data
    * @callback: a callback function (err, result)
    */
   static async increment(collection, key, data, callback) {
    this.db.collection(collection).updateOne(key, { $inc: data, $currentDate: { lastModified: true } }, function (err, result) {
        callback(err, result);
    });
}

    /*
    * Insert a sub document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @data: Document data
    * @callback: a callback function (err, result)
    */
   static async insertPush(collection, key, data, callback) {
    this.db.collection(collection).updateOne(key, { $push: data}, function (err, result) {
        callback(err, result);
    });
}

 /*
    * Delete a sub document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @data: Document data
    * @callback: a callback function (err, result)
    */
   static async deletePull(collection, key, data, callback) {
    this.db.collection(collection).updateOne(key, { $pull: data }, function (err, result) {
        callback(err, result);
    });
}

    /*
    * Delete document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @callback: a callback function (err, result)
    */
    static async deleteOne(collection, key, callback) {
        this.db.collection(collection).deleteOne(key, function (err, result) {
            callback(err, result);
        });
    }

    /*
    * Retrieve all the documents in a collection 
    * @collection: Collection name
    */
    static async selectAll(collection,callback) {
        return this.db.collection(collection).find().toArray(
            function (err, result) {
                callback(err, result);
            }
        );
    }


    /*
    * Retrieve a document in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @clause: The clause for the retrieval
    * @callback: a callback function (err, result)
    */

    static async selectOne(collection, fields, clause, callback) {
        this.db.collection(collection).findOne(clause,fields, function (err, result) {
            callback(err, result);
        });
    }

    static async findOne(collection, key) {
        return this.db.collection(collection).findOne(key);
    }


    /*
    * Retrieve many documents satisfying a clause in a collection
    * @collection: Collection name
    * @key: The unique key of the document
    * @clause: The clause for the retrieval
    * @callback: a callback function (err, result)
    */
    static async selectMany(collection, key, clause, callback) {
        this.db.collection(collection).find(key, clause).toArray(function (err, result) {
            callback(err, result);
        });
    }
}

/*
* Connection Class Members
*/
Connection.db = null;
Connection.options = { useUnifiedTopology: true , useNewUrlParser: true };

module.exports = {Connection};