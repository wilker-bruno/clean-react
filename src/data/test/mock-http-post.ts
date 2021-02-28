import Faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: Faker.internet.url(),
  body: Faker.random.objectElement()
})
