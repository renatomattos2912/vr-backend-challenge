"use strict";

const express           = require('express');
const router            = express.Router();
const queryMount        = require(__base + 'lib/mongoose-paginate-queryMount');
const utils             = require(__base + 'lib/utils');

// Model
const propertiesModel   = require('./model');

/**
 * GET
 */
router.get('/', function(req, res) {
    let query = {};
    let options = {};
    let q = queryMount(req, query, options);

    if(q.err) {
        return res.status(400)
            .set('Content-Type', 'application/json')
            .json(q);
    }

    propertiesModel.paginate({}, {}).then(function(result) {
        return res.status(200)
            .set('Content-Type', 'application/json')
            .json(result);
    });
    /*propertiesModel.find({}, {})
        .then(function(re) {
            return res.status(200)
                .set('Content-Type', 'application/json')
                .json(re);
        })
        .catch(function(e) {
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(e);
        });*/
});

/**
 * POST
 */
router.post('/', function (req, res) {

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