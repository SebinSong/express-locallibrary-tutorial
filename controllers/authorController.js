const Author = require('../models/Author')
const Book = require('../models/Book')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

// validation-utils
const createNameValidator = (key, name) => {
  return body(key)
    .trim().isLength({ min: 1 }).escape()
    .withMessage(`${name} must be specified`)
    .isAlphanumeric()
    .withMessage(`${name} must not contain non-alphanumeric characters.`)
}
const createDateValidation = (key, name) => {
  return body(key, `Invalid ${name}.`)
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate()
}

// Display list of all Authors
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find({}).sort({ family_name: 1 }).exec()

  res.render('author_list', {
    title: 'Author List',
    author_list: allAuthors
  })
})

// Display detail page for a specific Author
exports.author_detail = asyncHandler(async (req, res, next) => {
  // Get details of the author and all their books (in parallel)
  const [author, allBooks] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec()
  ])

  if (author === null) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }

  res.render('author_detail', {
    title: author.name,
    author,
    author_books: allBooks,
    alreadyExists: Boolean(req.query.exists)
  })
})

// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.render('author_form', { title: 'Create Author' })
})

// Handle Author create on POST.
exports.author_create_post = [
  // Validate 'first_name' & 'family_name' fields.
  createNameValidator('first_name', 'First name'),
  createNameValidator('family_name', 'Family name'),

  // Validate 'date_of_birth' & 'date_of_death' fields.
  createDateValidation('date_of_birth', 'Date of birth'),
  createDateValidation('date_of_death', 'Date of death'),

  // process the forms
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array()
      })
    }

    const {
      first_name,
      family_name,
      date_of_birth,
      date_of_death
    } = req.body

    // Data from form is valid.
    const newAuthor = new Author({
      first_name,
      family_name,
      date_of_birth,
      date_of_death
    })
    const redirect = (url) => res.redirect(url)
    const authorExists = await Author.findOne({
      $and: [
        { 'first_name': first_name },
        { 'family_name': family_name }
      ] 
    })
  
    if (authorExists) {
      res.redirect(authorExists.url + '?exists=true')
    } else {
      await newAuthor.save()
      res.redirect(newAuthor.url)
    }
  })
]

// Display Author delete form on GET
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id

  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(authorId).exec(),
    Book.find({ author: authorId }, 'title summary').exec()
  ])

  if (!author) {
    return res.redirect('/catalog/authors')
  }

  res.render('author_delete', {
    title: 'Delete author',
    author,
    author_books: allBooksByAuthor
  })
})

// Handle Author delete on POST
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id

  await Author.findByIdAndDelete(authorId).exec()
  res.redirect('/catalog/authors')
})

// Display Author update form on GET
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET')
})

// Handle Author update on POST
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POST')
})
