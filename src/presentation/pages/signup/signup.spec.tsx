import React from 'react'
import Faker from 'faker'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { FormHelper, ValidationSpy, AddAccountSpy } from '@/presentation/test'
import SignUp from './signup'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <SignUp validation={validationSpy} addAccount={addAccountSpy} />
  )
  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = Faker.name.findName(),
  email = Faker.internet.email(),
  password = Faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'name', name)
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)
  FormHelper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = Faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show valid name state if validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name')
  })

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password')
  })

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'name')
    FormHelper.populateField(sut, 'email')
    FormHelper.populateField(sut, 'password')
    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    FormHelper.testElementExists(sut, 'spinner')
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = Faker.name.findName()
    const email = Faker.internet.email()
    const password = Faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call authentication if form is invalid', async () => {
    const validationError = Faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if authentication fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    FormHelper.testElementText(sut, 'main-error', error.message)
    FormHelper.testChildCount(sut, 'error-wrap', 1)
  })
})
