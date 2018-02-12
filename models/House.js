const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const houseSchema = new mongoose.Schema({
  parent: {
    type : mongoose.Schema.ObjectId,
    ref : 'Property',
    required : 'A property parent reference is required!.'
  },
  buildingType: {
    type: String,
    required: 'A building type is required!.',
    trim: true
  },
  titleType: {
    type: String,
    default : null,
    trim: true
  },
  landArea : {
    type : Number,
    default : null
  },
  floorArea : {
    type : Number,
    default : null
  },
  registeredValue : {
    type : Number,
    default : null
  },
  registeredValueUnit : {
    type : String,
    default : 'USD'
  },
  rates : {
    type : Number,
    default : null
  },
  ratesUnit : {
    type : String,
    default : 'USD'
  },
  insurance : {
    type : Number,
    default : null
  },
  insuranceUnit : {
    type : String,
    default : 'USD'
  },
  capitalGrowth : {
    type : Number,
    default : null
  },
  beedrooms : {
    type : Number,
    default : null
  },
  bathrooms : {
    type : Number,
    default : null
  },
  parkingSpaces : {
    type : Number,
    default : null
  },
  fenced : {
    type : Boolean,
    default : false
  },
  rented : {
    type : Boolean,
    default : false
  },
  rentPrice : {
    type : Number,
    default : null
  },
  rentPriceUnit : {
    type : String,
    default : 'USD'
  },
  rentPricePeriod : {
    type : String,
    trim : true,
    default : null
  },
  rentAppraisalDone : {
    type : Boolean,
    default : false
  },
  vacancy : {
    type : Number,
    default : null
  },
  bodyCorporate : {
    type : Number,
    default : null
  },
  bodyCorporateUnit : {
    type : String,
    default : 'USD'
  },
  utilitiesCost : {
    type : Number,
    default : null
  },
  utilitiesCostUnit : {
    type : String,
    default : 'USD'
  },
  managed : {
    type : Number,
    default : null
  },
  agent : {
    type : String,
    trim : true,
    default : null
  }
});

module.exports = mongoose.model('House', houseSchema);