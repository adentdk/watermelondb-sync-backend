import bcrypt from 'bcrypt'

const hash = plain => {
  const encrypted = bcrypt.hashSync(plain, 12)

  return encrypted
}

const compare = (plain, encrypted) => {
  const result = bcrypt.compareSync(plain, encrypted)

  return result
}

export default {
  hash,
  compare
}