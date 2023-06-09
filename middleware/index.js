const authenticate = require("./authenticate");
const isValidId = require('../middleware/isValidId');
const upload = require("../middleware/upload");

module.exports = {
   authenticate,
   isValidId,
   upload,
}