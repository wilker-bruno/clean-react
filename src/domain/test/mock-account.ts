import Faker from 'faker'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: Faker.internet.email(),
  password: Faker.internet.password()
})

export const mockAccount = (): AccountModel => ({
  accessToken: Faker.random.uuid()
})
