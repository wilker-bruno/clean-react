import React from 'react'
import Faker from 'faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { FormHelper, ValidationSpy } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(
    <SignUp validation={validationSpy} />
  )
  return {
    sut
  }
}

const populateField = (
  sut: RenderResult,
  fieldName: string,
  fieldValue = Faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value: fieldValue } })
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', 'Campo obrigatório')
    FormHelper.testStatusForField(sut, 'password', 'Campo obrigatório')
    FormHelper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('should show name error if validation fails', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })
})
