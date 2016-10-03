"use strict";

const fs = require('fs'),
    promise = require("bluebird"),
    waterfall = require('async/waterfall'),
    mongoose = require('mongoose');

// Mongoose
const mongo_url = 'mongodb://localhost/VRBackEndChallenge';
const db = mongoose.connection;
db.on('error', console.error);
mongoose.connect(mongo_url);
mongoose.Promise = require('bluebird');

// Model
const provincesModel = require('../api/provinces/model');

// Promise Init
promise.promisifyAll(fs);

// Import Provinces
waterfall([
    function (callback) {
        provincesModel.count({})
            .then(function (count) {
                callback(null, count);
            })
            .catch(function (err) {
                throw err;
            });
    },
    function (count, callback) {
        if (count > 0) {
            console.log("Provinces não foram importadas pois o banco já possui registros!");
            return callback(null, false);
        }

        fs.readFileAsync('./provinces.json', 'utf8')
            .then(function (resolve, reject) {
                let provincesJSON = JSON.parse(resolve);
                let length = Object.keys(provincesJSON).length;
                let count = 0;

                for (let key in provincesJSON) {
                    if (provincesJSON.hasOwnProperty(key)) {
                        let obj = provincesJSON[key];

                        let province = {
                            "name":                         key,
                            "boundaries.upperLeft.x":       obj.boundaries.upperLeft.x,
                            "boundaries.upperLeft.y":       obj.boundaries.upperLeft.y,
                            "boundaries.bottomRight.x":     obj.boundaries.bottomRight.x,
                            "boundaries.bottomRight.y":     obj.boundaries.bottomRight.y
                        };

                        let newProvince = new provincesModel(province);

                        newProvince.save()
                            .then(function (res) {
                                console.log(res);
                                if (count === (length - 1)) {
                                    callback(null, true);
                                }
                                count++;
                            })
                            .catch(function (err) {
                                throw err;
                            });
                    }
                }
            })
            .catch(function (err) {
                return callback(null, err);
            });
    }
], function (err, res) {
    if (err) {
        throw err;
    }

    if(!res) {
        process.exit();
    }

    console.log("Importação de provinces finalizada com sucesso.");
    process.exit();
});