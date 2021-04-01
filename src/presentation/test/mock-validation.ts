import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  input: object
  fieldName: string
  errorMessage: string

  validate (fieldName: string, input: object): string {
    this.input = input
    this.fieldName = fieldName
    return this.errorMessage
  }
}
