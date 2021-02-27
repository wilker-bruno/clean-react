import Faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: Faker.internet.email(),
  password: Faker.internet.password()
})
