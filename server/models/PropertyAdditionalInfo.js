const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const propertyAdditionalInfoSchema = new mongoose.Schema({
  loanCoverage: {
    type: Number,
    default: 0
  },
  loanTerm: {
    type: Number,
    default: 0
  },
  interestRates: {
    type: Number,
    default: 0
  },
  paymentFrecuency: {
    type: Number,
    default: 26 //fortnigthly
  }
});


module.exports = mongoose.model('PropertyAdditionalInfo', propertyAdditionalInfoSchema);