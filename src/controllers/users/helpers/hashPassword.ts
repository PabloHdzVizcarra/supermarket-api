import bcrypt from 'bcrypt'
import { UserModel } from '../../../types/types'

export function hashPassword(data: UserModel): UserModel {
  const { name, lastname, username, password, email, dateOfBirth } = data
  const hashPass: string = bcrypt.hashSync(password, 10)
  return {
    name,
    lastname,
    username,
    email,
    dateOfBirth,
    password: hashPass,
  }
}
