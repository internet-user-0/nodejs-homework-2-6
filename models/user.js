const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const registerSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().min(6).required(),
});

const userShema = new Schema({
   password: {
      type: String,
      required: [true, 'Password is required'],
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
   },
   subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
   },
   token: {
      type: String,
      default: null,
   },
   avatarURL: {
      type: String,
      required: true,
   },
});

userShema.post('save', handleMongooseError);

const User = model('user', userShema);

module.exports = {
   User,
   registerSchema,
   loginSchema,
};
