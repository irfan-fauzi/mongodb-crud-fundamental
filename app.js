const { ObjectID } = require('bson')
const { MongoClient } = require('mongodb')
const uriLocal = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uriLocal)
const database = client.db('contactApp')


const connectToMongo = async() => {
  try {
    await client.connect()
    console.log("berhasil koneksi")
  } catch (error) {
    console.log(`ada kesalahan ${error}`)
  }
}

connectToMongo()

// create
const addField = async() => {
  try {
    await connectToMongo()
    await database.collection('contact').insertOne({
      name : "adam",
      email: "adam@yahoo.com"
    })    
  } catch (error) {
    console.log(`ada kesalahan dalam insert data : ${error}`)    
  }
}


// read
const searchName = {name: "adam"}

const loadAllData = (error, result) => {
  if(error) return error
  console.log(result)
}

const showDocument = async() => {
  try {
    await connectToMongo()
    const find = await database.collection('contact').find(searchName).toArray(loadAllData)
    return find()    
  } catch (error) {
    console.log(`ada kesalahan : ${error}`)
  }
}

// showDocument()
// console.log('satu')
// addField()
// console.log('tiga')

// update 
const specifiedID = { _id : ObjectID('613373f59a4b64de75819ece') }
const setNewSpecified = {
  $set: {
    name: "luke shaw",
    email: "luka@acmilan.com"
  }
}

const updateWithPromise = database.collection('contact').updateOne(specifiedID, setNewSpecified)

const updateDocument = async() => {
  try {
    const update = await updateWithPromise
    console.log(`berhasil edit : ${JSON.stringify(update)}`)
  } catch (error) {
    console.log(`ada kesalahan : ${error}`)
  }
}

//updateDocument()
// menghapus data
const deleteDocument = async() => {
  try {
    const deleteDoc = await database.collection('contact').deleteOne(specifiedID)
    console.log(deleteDoc)
  } catch (error) {
    console.log(error)
  }
}

deleteDocument()
