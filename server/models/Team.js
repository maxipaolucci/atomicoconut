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

teamSchema.index({ slug : 1 }, { unique : true });

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

//before findOneAndUpdate this schema if it modifies the name then we need to update the team slug too
teamSchema.pre('findOneAndUpdate', async function(next) {
  const originalConditions = Object.assign({}, this._conditions); //save the original update conditions
  if (this.getUpdate().$set && this.getUpdate().$set.name) {
    let newSlug = slug(this.getUpdate().$set.name);
    //find other stores that have a slug of 'team', 'team-2', 'team-3' ...
    const slugRegEx = new RegExp(`^(${newSlug})((-[0-9]*$)?)$`, 'i');
    const teamsWithSlug = await this.find({ slug: slugRegEx}); //RULE: at runtime this.contructor is going to be Team (the model)
    if (teamsWithSlug.length) {
      newSlug = `${newSlug}-${teamsWithSlug.length + 1}`;
    }
  
    this.getUpdate().$set.slug = newSlug; //set the new slug to the updates
    this._conditions = originalConditions; //restore the original conditions because we changed it when we did the previous find() in this method
    
    next();
    return; //stop this function from running
  }

  next(); //skip it
});

module.exports = mongoose.model('Team', teamSchema);