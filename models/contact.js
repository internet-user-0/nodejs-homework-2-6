const { Schema, model } = require('mongoose');
const Joi = require('joi');


const { handleMongooseError } = require('../helpers');


const addSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   phone: Joi.string().pattern(/^[0-9]+$/, 'numbers'),
   favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required()
});

const contactSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Set name for contact'],
   },
   email: {
      type: String,
   },
   phone: {
      type: String,
   },
   favorite: {
      type: Boolean,
      default: false,
   },
});

contactSchema.post("save", handleMongooseError)

const Contact = model('contact', contactSchema);

module.exports = {
   Contact,
   addSchema,
   updateFavoriteSchema
};
