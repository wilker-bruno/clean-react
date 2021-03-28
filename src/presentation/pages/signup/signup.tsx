import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) {
        return
      }
      setState(oldState => ({ ...oldState, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
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
        <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para login</Link>
        <FormStatus />
      </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
