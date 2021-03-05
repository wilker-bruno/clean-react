import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, emailError: validation.validate('email', state.email) }))
  }, [state.email])
  useEffect(() => {
    setState((oldState) =>
      ({ ...oldState, passwordError: validation.validate('password', state.password) }))
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState(oldState => ({ ...oldState, isLoading: true }))
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
      <form className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu email" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
