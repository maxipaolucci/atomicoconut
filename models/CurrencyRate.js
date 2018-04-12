const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const currencyRateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: 'A date is required!.'
  },
  rates : {
    type : mongoose.Schema.Types.Mixed,
    required : 'A rates object is required!.'
  }
});

currencyRateSchema.index({ date : 1 }, { unique : true });

module.exports = mongoose.model('CurrencyRate', currencyRateSchema);