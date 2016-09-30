"use strict";

var express = require('express');
var router = express.Router();

var queryMount = require(__base + 'lib/mongoose-paginate-queryMount');
var utils = require(__base + 'lib/utils');

// Models
var propertiesModel = require('./model');

router.get('/', function (req, res) {
    var query = {};
    var options = {};
    var q = queryMount(req, query, options);

    if(q.err) {
        return res.status(400)
            .set('Content-Type', 'application/json')
            .json(q);
    }

    propertiesModel.paginate(query, options, function(err, result) {
        if (err)
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(err);

        return res.status(200)
            .set('Content-Type', 'application/json')
            .json(result);
    });
});

/**
 * POST
 */
router.post('/', function (req, res, next) {

    var Property = new propertiesModel();

    utils.isNotUndefined(req.body.title) ? Property.title = req.body.title : null;
    utils.isNotUndefined(req.body.price) ? Property.price = req.body.price : null;
    utils.isNotUndefined(req.body.description) ? Property.description = req.body.description : null;
    utils.isNotUndefined(req.body.lat) ? Property.lat = req.body.lat : null;
    utils.isNotUndefined(req.body.long) ? Property.long = req.body.long : null;
    utils.isNotUndefined(req.body.beds) ? Property.beds = req.body.beds : null;
    utils.isNotUndefined(req.body.baths) ? Property.baths = req.body.baths : null;
    utils.isNotUndefined(req.body.squareMeters) ? Property.squareMeters = req.body.squareMeters : null;

    Property.save()
        .then(function(savedPerson) {
            return res.status(200)
                .set('Content-Type', 'application/json')
                .json(savedPerson);

        })
        .catch(function(err) {
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(err);
        });

});

module.exports = router;