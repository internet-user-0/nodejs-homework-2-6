const {
   Contact,
   addSchema,
   updateFavoriteSchema,
} = require('../models/contact');

const {
   listContacts,
   getContactById,
   removeContact,
   addContact,
   updateContact,
} = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
   const result = await Contact.find();
   if (!result) {
      throw HttpError(404, 'Server error');
   }
   res.json(result);
};

const getById = async (req, res, next) => {
   const { contactId } = req.params;
   const result = await Contact.findById(contactId);

   if (!result) {
      throw HttpError(404, 'Not found');
   }
   res.json(result);
};

const add = async (req, res, next) => {
   const { error } = addSchema.validate(req.body);
   if (error) {
      throw HttpError(400, error.message);
   } else {
      const result = await Contact.create(req.body);
      res.status(201).json(result);
   }
};

const remove = async (req, res, next) => {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndRemove(contactId);
   if (!result) {
      throw HttpError(404, 'Not found');
   }
   res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res, next) => {
   const { error } = addSchema.validate(req.body);
   if (error) {
      throw HttpError(400, 'missing fields');
   }
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
   });
   if (!result) {
      throw HttpError(404, 'Not found');
   }
   res.json(result);
};

const updateStatusContact = async (req, res, next) => {
   const { error } = updateFavoriteSchema.validate(req.body);
   if (error) {
      throw HttpError(400, 'missing field favorite');
   }
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
   });
   if (!result) {
      throw HttpError(404, 'Not found');
   }
   res.json(result);
};

module.exports = {
   getAll: ctrlWrapper(getAll),
   getById: ctrlWrapper(getById),
   add: ctrlWrapper(add),
   remove: ctrlWrapper(remove),
   update: ctrlWrapper(update),
   updateStatusContact: ctrlWrapper(updateStatusContact),
};
