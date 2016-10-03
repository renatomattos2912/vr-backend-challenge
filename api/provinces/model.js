"use strict";

let mongoose = require('mongoose');
let validation = require('./validation');

let Schema = mongoose.Schema;

let ProvincesSchema = new Schema(
    {
        "created_at":                   { type: Date, default: Date.now },
        "updated_at":                   { type: Date, default: Date.now },
        "name":                         { type: String, required: true },
        "boundaries.upperLeft.x":       { type: Number, required: true },
        "boundaries.upperLeft.y":       { type: Number, required: true },
        "boundaries.bottomRight.x":     { type: Number, required: true },
        "boundaries.bottomRight.y":     { type: Number, required: true }
    },
    {
        collection: "Provinces"
    }
);

module.exports = mongoose.model('Provinces', ProvincesSchema);