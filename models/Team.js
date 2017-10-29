const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  slug : String,
  admin : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required : 'An admin user is required!.'
  },
  teamUsers : [{
    type : mongoose.Schema.ObjectId,
    ref : 'TeamUser'
  }]
});

//before save in the schema populates slug with name
teamSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
      next(); //skip it
      return; //stop this function from running
  }
  this.slug = slug(this.name);
  //find other stores that have a slug of 'team', 'team-2', 'team-3' ...
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const teamsWithSlug = await this.constructor.find({ slug: slugRegEx}); //RULE: at runtime this.contructor is going to be Team (the model)
  if (teamsWithSlug.length) {
      this.slug = `${this.slug}-${teamsWithSlug.length + 1}`;
  }
  
  next();
});

module.exports = mongoose.model('Team', teamSchema);