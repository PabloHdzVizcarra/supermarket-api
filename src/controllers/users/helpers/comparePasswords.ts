import bcrypt from 'bcrypt'

export function comparePasswords(hashPassword: string, password: string): void {
  const pass = bcrypt.compareSync(password, hashPassword)
  console.log(pass)
}
