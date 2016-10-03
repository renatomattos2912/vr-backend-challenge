"use strict";

var fs = require('fs');
var promise = require("bluebird");
var propertiesModel = require('../api/properties/model');

promise.promisifyAll(fs);


//console.log("count is: " + count);
//if (count <= 0) {
    fs.readFileAsync('./properties.json', 'utf8')
        .then(function (resolve, reject) {
            let propertiesJSON = JSON.parse(resolve);

            propertiesJSON.properties.forEach(function (propertie) {

                delete propertie['id'];

                console.log(propertie);

                let newPropertie = new propertiesModel(propertie);

                newPropertie.save(function(err, res) {
                    if(err) {
                        throw err;
                    }

                    console.log(res);
                });
            });
        });
//}

