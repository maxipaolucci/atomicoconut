const mongoose = require('mongoose');
const validator = require('validator'); //validator package in nodejs, check doc online

mongoose.Promise = global.Promise;

const investmentSchema = new mongoose.Schema({
  investmentType: {
    type: String,
    required: 'An investment type is required!.',
    trim: true
  },
  createdBy: {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'An investment creator (User) is required!.'
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
  amount : {
    type : Number,
    default : 0,
    required : 'An investment amount is required!.'
  },
  amountUnit : {
    type : String,
    default : 'USD'
  },
  team : {
    type : mongoose.Schema.ObjectId,
    ref : 'Team',
    default : null
  },
  investmentDistribution : [{
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid member email address']
    },
    percentage : {
      type: Number,
      default : 0
    }
  }],
  loanAmount : {
    type : Number,
    default : 0
  },
  loanAmountUnit : {
    type : String,
    default : 'USD'
  },
  simulate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Investment', investmentSchema);