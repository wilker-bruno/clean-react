import Faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(Faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(Faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(Faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
