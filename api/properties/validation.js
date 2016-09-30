"use strict";

var validate = require('mongoose-validator');

// Validation
var numberValidator = [
    validate({
        validator: 'isNumeric',
        message: 'O valor informado não é um número válido.'
    })
];

var stringLengthValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 200],
        message: 'O texto precisa ter tamanho entre {ARGS[0]} e {ARGS[1]} caracteres.'
    })
];

module.exports = {
    numberValidator: numberValidator,
    stringLengthValidator: stringLengthValidator
};