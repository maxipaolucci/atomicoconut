const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const teamUserSchema = new mongoose.Schema({
  team : {
    type : mongoose.Schema.ObjectId,
    ref : 'Team',
    required : 'A team is required.'
  },
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A user is required.'
  },
  isAdmin : {
    type : Boolean,
    default : false
  }
});

//define our indexes for our searchs feature. This is going to create a compound index base on the two fields. Allowing us to search in both fields in one shot
teamUserSchema.index({ team : 1, user : 1 }, { unique : true });

module.exports = mongoose.model('TeamUser', teamUserSchema);