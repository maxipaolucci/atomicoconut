const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const propertySchema = new mongoose.Schema({
  propertyType: {
    type: String,
    required: 'A currency type is required!.',
    trim: true
  },
  createdBy: {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A property creator (User) is required!.'
  },
  createdOn : {
    type : Date,
    default: Date.now
  },
  updatedBy: {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    default: null
  },
  updatedOn : {
    type : Date,
    default: Date.now
  },
  address: {
    type: String,
    required: 'An address is required!.',
    trim: true
  },
  askingPrice : {
    type : Number,
    default : null
  },
  askingPriceUnit : {
    type : String,
    default : 'USD'
  },
  offerPrice : {
    type : Number,
    default : null
  },
  offerPriceUnit : {
    type : String,
    default : 'USD'
  },
  walkAwayPrice : {
    type : Number,
    default : null
  },
  walkAwayPriceUnit : {
    type : String,
    default : 'USD'
  },
  salePrice : {
    type : Number,
    default : null
  },
  salePriceUnit : {
    type : String,
    default : 'USD'
  },
  dateListed : {
    type : Date,
    default : null
  },
  reasonForSelling: {
    type: String,
    default : null,
    trim: true
  },
  marketValue : {
    type : Number,
    default : null
  },
  marketValueUnit : {
    type : String,
    default : 'USD'
  },
  renovationCost : {
    type : Number,
    default : null
  },
  renovationCostUnit : {
    type : String,
    default : 'USD'
  },
  mantainanceCost : {
    type : Number,
    default : null
  },
  mantainanceCostUnit : {
    type : String,
    default : 'USD'
  },
  otherCost : {
    type : Number,
    default : null
  },
  otherCostUnit : {
    type : String,
    default : 'USD'
  },
  description: {
    type: String,
    default : null,
    trim: true
  },
  notes: {
    type: String,
    default : null,
    trim: true
  }
});

module.exports = mongoose.model('Property', propertySchema);