import Faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation(Faker.random.word())
    const error = sut.validate(Faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const sut = new EmailValidation(Faker.random.word())
    const error = sut.validate(Faker.internet.email())
    expect(error).toBeFalsy()
  })
})
