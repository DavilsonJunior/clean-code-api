import { Collection, MongoClient, DataKey, UUID } from 'mongodb'

export interface MongoID {
  _id: string
}

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    // this.client = await MongoClient.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // })
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  // map ({ id, ...accountData }: AccountModel): AccountModel {
  //   return Object.assign({}, accountData, { id })
  // }
  map<T extends MongoID>({ _id, ...collectionData }: T): Omit<T, '_id'> & { id: string } {
    const mappedData = Object.assign({}, collectionData, { id: _id }) as Omit<T, '_id'> & { id: string }
    return mappedData
  }
}
