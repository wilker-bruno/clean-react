import Faker from 'faker'
import { ValidationBuilder } from './validation-builder'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  CompareFieldsValidation
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = Faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = Faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toStrictEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const field = Faker.database.column()
    const length = Faker.random.number()
    const validations = ValidationBuilder.field(field).min(length).build()
    expect(validations).toStrictEqual([new MinLengthValidation(field, length)])
  })

  test('should return CompareFieldsValidation', () => {
    const field = Faker.database.column()
    const fieldToCompare = Faker.database.column()
    const validations = ValidationBuilder.field(field).sameAs(fieldToCompare).build()
    expect(validations).toStrictEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('should return a list of validations', () => {
    const field = Faker.database.column()
    const length = Faker.random.number()
    const validations = ValidationBuilder.field(field).required().min(length).email().build()
    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
