import { AccountModel } from '@/domain/models'
import { mockAccount } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccount()
  callsCount = 0
  params: AddAccountParams

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return await Promise.resolve(this.account)
  }
}
