import Faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string): EmailValidation =>
  new EmailValidation(field)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: Faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: Faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
