import Faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: Faker.internet.email(),
  password: Faker.internet.password()
})

export const mockAccount = (): AccountModel => ({
  accessToken: Faker.random.uuid()
})
