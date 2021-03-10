import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Faker from 'faker'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={ { state: {} } }>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const field = Faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
