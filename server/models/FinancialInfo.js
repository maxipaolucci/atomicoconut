const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const financialInfoSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A user is required!.'
  },
  annualIncome : {
    type : Number,
    default : null
  },
  annualIncomeUnit : {
    type : String,
    default : 'USD'
  },
  incomeTaxRate : {
    type : Number,
    default : null
  },
  savings : {
    type : Number,
    default : null
  },
  savingsUnit : {
    type : String,
    default : 'USD'
  }
});


module.exports = mongoose.model('FinancialInfo', financialInfoSchema);