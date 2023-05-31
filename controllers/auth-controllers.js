const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, registerSchema, loginSchema } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
   const { error } = registerSchema.validate(req.body);
   if (error) {
      throw HttpError(400, error.message);
   }

   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, 'Email in use');
   }

   const hashPasword = await bcrypt.hash(password, 10);

   const newUser = await User.create({ ...req.body, pasword: hashPasword });

   res.status(201).json({
      email: newUser.email,
   });
};

const login = async (req, res, next) => {
   const { error } = loginSchema.validate(req.body);
   if (error) {
      throw HttpError(400, error.message);
   }
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (!user) {
      throw HttpError(401, 'Email or password is wrong');
   }
   const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
   }

   const payload = {
      id: user._id
   }

   const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

   res.json({
      token,
   });
};

module.exports = {
   register: ctrlWrapper(register),
   login: ctrlWrapper(login),
};
