const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  dob: { type: String,required:true },
  isDeleted : {type: Boolean, default:false},
  role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'}

},{
  timestamps: true
}
);

userSchema.pre('save',async function(next) {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
   }catch(error){
    next(error);
   }
})

//Exclude password property while converting to toJSON from Document
userSchema.set('toJSON', {
  transform: function(err,ret){
      delete ret.passowrd;
      return ret;
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;


