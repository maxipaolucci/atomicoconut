const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const personalInfoSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A user is required!.'
  },
  birthday : {
    type : Date,
    default : null
  }
});


module.exports = mongoose.model('PersonalInfo', personalInfoSchema); //Mongo stores a table called "reviews" in the DB (it lowecase the model name and add an s automatically at the end)