const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 characters'],
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },

    number:{
      type: Number,
      required: true,
      default: '0'
    },

    birthDate:
    {type: Date, required: true, default: '0' },

    about:{
      type: String,
      default: 'N.A'
  },
  address:{
    type: String,
    default: 'N.A'
}


}, {timestamps: true });

//before document is saved
usersSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


// static method to login user
usersSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };


const User = mongoose.model('user', usersSchema);
module.exports = User;