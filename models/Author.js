const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
})

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for those cases
  return this.first_name && this.family_name
    ? `${this.first_name} ${this.family_name}`
    : ''
})

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
})
AuthorSchema.virtual('dBirth').get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : ''
})
AuthorSchema.virtual('dDeath').get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ''
})
AuthorSchema.virtual('lifespan').get(function () {
  return `${this.dBirth} - ${this.dDeath}`
})

module.exports = mongoose.model('Author', AuthorSchema)
