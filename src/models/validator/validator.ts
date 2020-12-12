import {
  body,
  Result,
  ValidationChain,
  validationResult,
} from 'express-validator'
import { NextFunction, Request, Response } from 'express'

export function userValidationRules(): Array<ValidationChain> {
  return [
    body('name', 'debes agegar un nombre valido').isString().not().isEmpty(),
    body('lastname', 'debes agregar un apellido')
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    body('username').isString().notEmpty().isLength({ min: 3 }),
    body('password').isString().notEmpty().isLength({ min: 8 }),
    body('yearOfBirth').isString().notEmpty(),
    body('email').isString().notEmpty().isEmail(),
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
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({
    errors: extractedErrors,
  })
}
