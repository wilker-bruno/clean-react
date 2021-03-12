import Faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(Faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(Faker.random.word())
    const error = sut.validate(Faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})