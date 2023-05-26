const express = require('express');
const router = express.Router();

const { isValidId } = require('../../helpers');

const {
   getAll,
   getById,
   add,
   remove,
   update,
   updateStatusContact,
} = require('../../controllers/contacts-consrollers');

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', add);

router.delete('/:contactId', isValidId, remove);

router.put('/:contactId', isValidId, update);

router.patch('/:contactId/favorite', isValidId, updateStatusContact);

module.exports = router;
