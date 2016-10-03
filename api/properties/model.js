"use strict";

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseUniqueValidator = require('mongoose-unique-validator');
let validation = require('./validation');

let Schema = mongoose.Schema;

let PropertiesSchema = new Schema(
    {
        "created_at":           { type: Date, default: Date.now },
        "updated_at":           { type: Date, default: Date.now },
        "lat":                  { type: Number, required: true },
        "long":                 { type: Number, required: true },
        "title":                { type: String, required: true, validate: validation.stringLengthValidator },
        "price":                { type: Number, required: true },
        "description":          { type: String, required: true, validate: validation.stringLengthValidator },
        "beds":                 { type: Number, required: true },
        "baths":                { type: Number, required: true },
        "squareMeters":         { type: Number, required: true }
    },
    {
        collection: "Properties"
    }
);

mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 100
};

PropertiesSchema.plugin(mongooseUniqueValidator);
PropertiesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Properties', PropertiesSchema);