const { MongoClient } = require('mongodb')
const uriLocal = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uriLocal)
const connectToMongo = async() => {
  try {
    await client.connect()
    const database = client.db('contactApp')
    const collection = database.collection('contact')
    const exampleDocument = await collection.findOne({
      "name": "sopo",
      "email": "sopo@yahoo.com"
    })
    console.log(exampleDocument)
  } catch (error) {
    console.log(`ada kesalahan ${error}`)
  }
}

connectToMongo()