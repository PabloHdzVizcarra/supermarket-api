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
    body('name', 'debes agregar un nombre valido').isString().not().isEmpty(),
    body('lastname', 'debes agregar un apellido')
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    body('username', 'debes agregar un nombre de usuario valido')
      .isString()
      .notEmpty()
      .isLength({ min: 3 }),
    body('password', 'debes agregar un contraseña valida')
      .isString()
      .notEmpty()
      .isLength({ min: 8 }),
    body('dateOfBirth', 'debes agregar una fecha valida').isString().notEmpty(),
    body('email', 'debes agregar un email valido')
      .isString()
      .notEmpty()
      .isEmail(),
  ]
}

export function loginValidationRules(): Array<ValidationChain> {
  return [
    body('email', 'should send email in request').notEmpty().isString(),
    body('password', 'should send password in request').notEmpty().isString(),
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
