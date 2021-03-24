import React, { useEffect, useState } from 'react'
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, nameError: validation.validate('name', state.name) }))
  }, [state.name])

  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, emailError: validation.validate('name', state.email) }))
  }, [state.email])

  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, passwordError: validation.validate('name', state.password) }))
  }, [state.password])

  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, passwordConfirmationError: validation.validate('name', state.passwordConfirmation) }))
  }, [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState(oldState => ({ ...oldState, isLoading: true }))
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu email" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <button data-testid="submit"
          disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError}
          className={Styles.submit}
          type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Voltar para login</span>
        <FormStatus />
      </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
