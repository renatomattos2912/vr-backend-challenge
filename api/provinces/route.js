"use strict";

const express = require('express');
const router = express.Router();
var utils = require(__base + 'lib/utils');

// Model
const provincesModel = require('./model');

/**
 * GET
 */
router.get('/', function (req, res) {
    provincesModel.find({}, {})
        .then(function (re) {
            return res.status(200)
                .set('Content-Type', 'application/json')
                .json(re);
        })
        .catch(function (e) {
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(e);
        });
});

/**
 * GET By ID
 */
router.get('/:id', function (req, res) {
    let id = req.param('id');

    provincesModel.find({_id: id}, {})
        .then(function (re) {
            return res.status(200)
                .set('Content-Type', 'application/json')
                .json(re);
        })
        .catch(function (e) {
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(e);
        });
});

/**
 * POST
 */
router.post('/', function (req, res) {

    var Province = new provincesModel();

    utils.isNotUndefined(req.body.name) ? Province.name = req.body.name : null;
    utils.isNotUndefined(req.body.boundaries.upperLeft.x) ? Province.boundaries.upperLeft.x = req.body.boundaries.upperLeft.x : null;
    utils.isNotUndefined(req.body.boundaries.upperLeft.y) ? Province.boundaries.upperLeft.y = req.body.boundaries.upperLeft.y : null;
    utils.isNotUndefined(req.body.boundaries.bottomRight.x) ? Province.boundaries.bottomRight.x = req.body.boundaries.bottomRight.x : null;
    utils.isNotUndefined(req.body.boundaries.bottomRight.y) ? Province.boundaries.bottomRight.y = req.body.boundaries.bottomRight.y : null;

    Province.save()
        .then(function (province) {
            return res.status(200)
                .set('Content-Type', 'application/json')
                .json(province);

        })
        .catch(function (err) {
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json(err);
        });

});

module.exports = router;