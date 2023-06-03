const BookInstance = require('../models/BookInstance')
const Book = require('../models/Book')

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
let booksCache

// utils
const genRequiredValidation = (key, name) => {
  return body(key, `${name} must be specified`)
    .trim()
    .isLength({ min: 1 })
    .escape()
}

// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const bookInstances = await BookInstance.find({}).populate('book').exec()

  res.render('bookinstance_list', {
    title: 'Book Instance List',
    bookinstance_list: bookInstances
  })
})

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec()

  if (bookinstance === null) {
    const err = new Error('book instance not found')
    err.status = 404
    return next(err)
  }

  res.render('bookinstance_detail', {
    title: 'Book', bookinstance
  })
})

// Display BookInstance create form on GET
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const books = await Book.find().exec()
  booksCache = books

  res.render('bookinstance_form', {
    title: 'Create Book instance',
    book_list: books
  })
})

// Handle BookInstance create on POST
exports.bookinstance_create_post = [
  // validate all required fields first,
  genRequiredValidation('book', 'Book title'),
  genRequiredValidation('imprint', 'Imprint'),
  genRequiredValidation('isbn', 'ISBN'),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  // Process the validated fields
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const {
      book, imprint, status, due_back, isbn
    } = req.body
    const bookIstance = new BookInstance({
      book, isbn, imprint, due_back, status
    })

    if (!errors.isEmpty()) {
      return res.render('bookinstance_form', {
        title: 'Create Book instance',
        book_list: booksCache,
        selected_book: bookIstance._id,
        errors: errors.array(),
        bookinstance: bookIstance
      })
    } else {
      await bookIstance.save()
      res.redirect(bookIstance.url)
    }
  })
]

asyncHandler(async (req, res, next) => {
  res.send('NOT_IMPLEMENTED: BookInstance create POST')
})

// Display BookInstance delete on GET
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT_IMPLEMENTED: BookInstance delete GET')
})

// Handle BookInstance delete POST
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT_IMPLEMENTED: BookInstance delete POST')
})

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET")
})

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST")
})
