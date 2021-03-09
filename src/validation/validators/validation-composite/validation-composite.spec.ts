import Faker from 'faker'
import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return { sut, fieldValidationsSpy }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = Faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = Faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(Faker.random.words())
    const error = sut.validate(fieldName, Faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('should return error if any validation fails', () => {
    const fieldName = Faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, Faker.random.word())
    expect(error).toBeFalsy()
  })
})