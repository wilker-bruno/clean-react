import Faker from 'faker'
import { AddAccountParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = Faker.internet.password()
  return {
    name: Faker.name.findName(),
    email: Faker.internet.email(),
    password: password,
    passwordConfirmation: password
  }
}
