import { Collection, MongoClient } from 'mongodb'

export interface MongoID {
  id: string
}

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
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

  map<T extends MongoID>({ id, ...collectionData }: T): T {
    const mappedData = Object.assign({}, collectionData, { id })
    return mappedData as T
  }
}
