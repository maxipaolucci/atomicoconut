const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const currencyRateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: 'A date is required!.',
    validate : [validator.isDate, 'Invalid date value']
  },
  rates : {
    type : Schema.Types.Mixed,
    required : 'A rates object is required!.'
  }
});

module.exports = mongoose.model('CurrencyRate', currencyRateSchema);