import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { FormHelper } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )
  return {
    sut
  }
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
