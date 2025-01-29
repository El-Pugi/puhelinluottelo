const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI // Yhteysosoite ympäristömuuttujasta

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Muotoillaan JSON-muotoiset palautukset
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Muutetaan _id merkkijonoksi ja korvataan id:llä
    delete returnedObject._id // Poistetaan _id
    delete returnedObject.__v // Poistetaan versiointikenttä
  }
})

module.exports = mongoose.model('Person', personSchema)
