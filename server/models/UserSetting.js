const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSettingSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A user is required.'
  },
  ratioBtcXmrNotification : {
    type: Boolean,
    default: false,
  },
  ratioBtcXmrMin : {
    type : Number,
    default : 0
  },
  ratioBtcXmrMax : {
    type : Number,
    default : 0
  }
});


module.exports = mongoose.model('UserSetting', userSettingSchema);