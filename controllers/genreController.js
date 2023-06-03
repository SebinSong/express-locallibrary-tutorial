const Genre = require('../models/Genre')
const Book = require('../models/Book')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

// Display list of all genre
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().exec()

  res.render('genre_list', {
    title: 'Genre List',
    genre_list: allGenres
  })
})

// Display detail page for a specific genre
exports.genre_detail = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel).
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec()
  ])

  if (genre === null) {
    // No results.
    const err = new Error('Genre not found')
    err.status = 404
    return next(err)
  }

  res.render('genre_detail', {
    title: 'Genre Detail',
    genre,
    genre_books: booksInGenre
  })
})

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' })
})

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize the name field
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('genre_form', {
        title: 'Create Genre', genre, errors: errors.array()
      })

      return
    } else {
      // Create a genre object with escaped and trimmed data.
      const genreName = req.body.name
      const genre = new Genre({ name: genreName })

      // Data from form is valid
      // Check if Genre with the same name already exists.
      const genreExists = await Genre.findOne({ name: genreName })
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url)
      } else {
        await genre.save()
        // New genre saved. Redirect to genre detail page.
        res.redirect(genre.url)
      }
    }
  })
]

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET")
})

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST")
})

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET")
})

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST")
})
