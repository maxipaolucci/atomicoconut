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
    default : null
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
    default : null
  }
});


module.exports = mongoose.model('FinancialInfo', financialInfoSchema);