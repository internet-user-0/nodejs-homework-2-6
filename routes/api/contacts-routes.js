const express = require('express');
const router = express.Router();

const { authenticate, isValidId } = require('../../middleware');

const {
   getAll,
   getById,
   add,
   remove,
   update,
   updateStatusContact,
} = require('../../controllers/contacts-consrollers');

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, add);

router.delete('/:contactId', authenticate, isValidId, remove);

router.put('/:contactId', authenticate, isValidId, update);

router.patch('/:contactId/favorite', authenticate, isValidId, updateStatusContact);

module.exports = router;
