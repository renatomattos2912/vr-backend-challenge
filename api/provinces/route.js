"use strict";

const express = require('express');
const router = express.Router();
var utils = require(__base + 'lib/utils');

// Model
const provincesModel = require('./model');

/**
 * @api {get} /provinces/:id Retorna todas as provinces
 * @apiName GetProvinces
 * @apiGroup Provinces
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
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
 * Retorna uma property pelo ID.
 * @instance
 * @method [GET] /properties/{id}
 * @returns {Object}
 *
 * @example
 *
 * // Success return
 {
   "_id": "57eeca984a0414690a17fce4",
   "squareMeters": 128,
   "baths": 4,
   "beds": 5,
   "long": 536,
   "lat": 358,
   "description": "Incididunt sint commodo ad incididunt eu id elit reprehenderit pariatur voluptate Lorem anim esse eu. Eiusmod exercitation ex minim anim aliquip eu sunt exercitation deserunt culpa.",
   "price": 1316000,
   "title": "Imóvel código 8000, com 5 quartos e 4 banheiros.",
   "__v": 0,
   "updated_at": "2016-09-30T20:27:04.093Z",
   "created_at": "2016-09-30T20:27:04.093Z"
 }
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
 * Cadastra uma property.
 * @instance
 * @method [POST] /properties
 * @returns {Object}
 *
 * @example
 *
 * // POST Object
 {
   "squareMeters": 128,
   "baths": 4,
   "beds": 5,
   "long": 536,
   "lat": 358,
   "description": "Incididunt sint commodo ad incididunt eu id elit reprehenderit pariatur voluptate Lorem anim esse eu. Eiusmod exercitation ex minim anim aliquip eu sunt exercitation deserunt culpa.",
   "price": 1316000,
   "title": "Imóvel código 8000, com 5 quartos e 4 banheiros."
 }

 * // Success return
 {
   "_id": "57eeca984a0414690a17fce4",
   "squareMeters": 128,
   "baths": 4,
   "beds": 5,
   "long": 536,
   "lat": 358,
   "description": "Incididunt sint commodo ad incididunt eu id elit reprehenderit pariatur voluptate Lorem anim esse eu. Eiusmod exercitation ex minim anim aliquip eu sunt exercitation deserunt culpa.",
   "price": 1316000,
   "title": "Imóvel código 8000, com 5 quartos e 4 banheiros.",
   "__v": 0,
   "updated_at": "2016-09-30T20:27:04.093Z",
   "created_at": "2016-09-30T20:27:04.093Z"
 }
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