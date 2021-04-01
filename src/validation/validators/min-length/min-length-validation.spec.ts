import Faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: Faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: Faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const sut = makeSut(Faker.database.column())
    const error = sut.validate({ [Faker.database.column()]: Faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
