const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const propertyUserSchema = new mongoose.Schema({
  property : {
    type : mongoose.Schema.ObjectId,
    ref : 'Property',
    required : 'A property is required.'
  },
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'A user is required.'
  },
  // team is optional, it works when this prop and user where linked using the "share with team" option.
  // then this field will have a team id and is going to be useful if in the future we want to remove
  // the sharing with this team. Because share with team is going to use this table too.
  team : {
    type : mongoose.Schema.ObjectId,
    ref : 'Team',
    default : null
  },
  isAdmin : {
    type : Boolean,
    default : false
  }
});

//define our indexes for our searchs feature. This is going to create a compound index base on the two fields. Allowing us to search in both fields in one shot
propertyUserSchema.index({ property : 1, user : 1, team : 1 }, { unique : true });

module.exports = mongoose.model('PropertyUser', propertyUserSchema);