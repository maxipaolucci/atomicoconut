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
  location : {
    type : {
      type : String,
      default : 'Point'
    },
    coordinates : [{
      type : Number
    }],
    address : {
      type : String,
      required : 'You must supply an address!'
    },
    mapsPlaceId : {
      type : String
    }
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

  purchasePrice : {
    type : Number,
    default : null
  },
  purchasePriceUnit : {
    type : String,
    default : 'USD'
  },
  purchasePrice2 : {
    type : Number,
    default : null
  },
  purchasePrice2Unit : {
    type : String,
    default : 'USD'
  },
  purchasePrice3 : {
    type : Number,
    default : null
  },
  purchasePrice3Unit : {
    type : String,
    default : 'USD'
  },
  purchasePrice4 : {
    type : Number,
    default : null
  },
  purchasePrice4Unit : {
    type : String,
    default : 'USD'
  },
  purchasePrice5 : {
    type : Number,
    default : null
  },
  purchasePrice5Unit : {
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
  maintenanceCost : {
    type : Number,
    default : null
  },
  maintenanceCostUnit : {
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
  },
  photos : {
    type : [String],
    default : []
  },
  unit: {
    type: String,
    default : null,
    trim: true
  }
});

module.exports = mongoose.model('Property', propertySchema);