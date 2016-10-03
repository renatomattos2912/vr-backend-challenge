"use strict";

let mongoose = require('mongoose');
let validation = require('./validation');

let Schema = mongoose.Schema;

let PropertiesSchema = new Schema(
    {
        "created_at":           { type: Date, default: Date.now },
        "updated_at":           { type: Date, default: Date.now },
        "lat":                  { type: Number, required: true },
        "long":                 { type: Number, required: true },
        "title":                { type: String, required: true },
        "price":                { type: Number, required: true },
        "description":          { type: String, required: true },
        "beds":                 { type: Number, required: true },
        "baths":                { type: Number, required: true },
        "squareMeters":         { type: Number, required: true }
    },
    {
        collection: "Properties"
    }
);

module.exports = mongoose.model('Properties', PropertiesSchema);