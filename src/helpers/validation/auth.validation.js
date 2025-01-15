const Joi = require('joi');
const {ROLES} = require('./enum.helper');

const createUserSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have at least 3 characters',
      'any.required': 'Name is required'
    }),
    lastName: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have at least 3 characters',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),
    dob: Joi.string().required(),
    role: Joi.string().required().valid(...Object.values(ROLES)),
  })
};

const loginSchema = {
  body : Joi.object({
    email: Joi.string().required(),
    password : Joi.string().required(),
  })
}

module.exports = { createUserSchema, loginSchema };
