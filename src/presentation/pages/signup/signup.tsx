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

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
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

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
      <form className={Styles.form}>
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
