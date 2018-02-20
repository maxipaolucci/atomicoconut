const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const propertyInvestmentSchema = new mongoose.Schema({
  parent: {
    type : mongoose.Schema.ObjectId,
    ref : 'Investment',
    required : 'An investment parent reference is required!.'
  },
  property: {
    type : mongoose.Schema.ObjectId,
    ref : 'Property',
    required : 'A property reference is required!.'
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

module.exports = mongoose.model('PropertyInvestment', propertyInvestmentSchema);