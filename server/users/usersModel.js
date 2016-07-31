var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
    }
  ]
})

  // before saving, hash the hell out of password
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});
  // helper method to check if passwords from client-side and DB match up
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);