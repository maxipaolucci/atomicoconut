const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const currencyInvestmentSchema = new mongoose.Schema({
  currencyType: {
    type: String,
    required: 'A currency type is required!.',
    trim: true
  },
  parent: {
    type : mongoose.Schema.ObjectId,
    ref : 'Investment',
    required : 'An investment parent reference is required!.'
  },
  amount : {
    type : Number,
    default : 0,
    required : 'A currency investment amount is required!.'
  },
  amountUnit : {
    type : String,
    default : 'USD'
  },
  buyingPrice : {
    type : Number,
    default : 0,
    required : 'A buying price is required!.'
  },
  buyingPriceUnit : {
    type : String,
    default : 'USD'
  },
  buyingDate : {
    type : Date,
    default : Date.now,
    required : 'A buying date is required!.'
  }
});

module.exports = mongoose.model('CurrencyInvestment', currencyInvestmentSchema);