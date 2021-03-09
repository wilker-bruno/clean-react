import { ValidationBuilder } from './validation-builder'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toStrictEqual([new EmailValidation('any_field')])
  })

  test('should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build()
    expect(validations).toStrictEqual([new MinLengthValidation('any_field', 5)])
  })
})
