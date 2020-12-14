import {
  body,
  Result,
  ValidationChain,
  validationResult,
} from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { LogError } from '../../modules/debug-logs/debug'

export function userValidationRules(): Array<ValidationChain> {
  return [
    body('name', 'you must add a valid name').isString().not().isEmpty(),
    body('lastname', 'you must add a valid lastname')
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    body('username', 'you must add a valid username')
      .isString()
      .notEmpty()
      .isLength({ min: 3 }),
    body('password', 'you must add a valid password')
      .isString()
      .notEmpty()
      .isLength({ min: 8 }),
    body('dateOfBirth', 'you must add a valid dateOfBirth')
      .isString()
      .notEmpty(),
    body('email', 'you must add a valid email').isString().notEmpty().isEmail(),
  ]
}

export function loginValidationRules(): Array<ValidationChain> {
  return [
    body('email', 'should send email in request').notEmpty().isString(),
    body('password', 'should send a password in request').notEmpty().isString(),
  ]
}

export function validate(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<void> {
  const errors: Result = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: { [x: number]: string }[] = []
  errors.array().map(err => extractedErrors.push(err.msg))
  LogError('wrong data sent')
  return res.status(422).json({
    errors: extractedErrors,
  })
}
