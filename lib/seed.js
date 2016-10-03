"use strict";

const   fs = require('fs'),
        promise = require("bluebird"),
        waterfall = require('async/waterfall'),
        mongoose = require('mongoose'),
        Future = require('fibers/future');

// Mongoose
const mongo_url = 'mongodb://localhost/VRBackEndChallenge';
const db = mongoose.connection;
db.on('error', console.error);
mongoose.connect(mongo_url);
mongoose.Promise = require('bluebird');

// Model
const propertiesModel = require('../api/properties/model');

// Promise Init
promise.promisifyAll(fs);

// Future
const futureProperties = new Future();
const futureProvinces = new Future();

waterfall([
    function (callback) {
        propertiesModel.count({})
            .then(function(count) {
                console.log("Properties não foram importadas pois o banco já possui registros!");
                callback(null, count);
            })
            .catch(function(err) {
                throw err;
            });
    },
    function (count, callback) {
        if (count > 0) {
            //return callback(null, false);
        }

        fs.readFileAsync('./properties.json', 'utf8')
            .then(function (resolve, reject) {
                let propertiesJSON = JSON.parse(resolve);

                propertiesJSON.properties.forEach(function(property, index, array) {
                    delete property['id'];

                    let newPropertie = new propertiesModel(property);

                    newPropertie.save()
                        .then(function(res){
                        //console.log(res);
                        //console.log(index +' / '+ (array.length - 1));
                        if(index === (array.length - 1)) {
                            callback(null, true);
                        }
                    }).catch(function(err) {
                        throw err;
                    });
                });
            })
            .catch(function (err) {
                return callback(null, err);
            });
    }
], function (err, res) {
    if (err) {
        throw err;
    }

    console.log("Importação de properties finalizada com sucesso.");

    //return res;
});

if(futureProperties.wait() && futureProvinces.wait()) {
    console.log("Importação completa!");
    process.exit();
}
