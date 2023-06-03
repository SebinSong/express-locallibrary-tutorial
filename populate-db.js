// This script populates some test books, authors, genres and book-instances to your database.
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {
  books: dummyBooks,
  bookInstances: dummyBookInstances
} = require('./seed-data.js')

mongoose.set('strictQuery', false)
dotenv.config()

const {
  DB_CONNECTION_STRING
} = process.env
const Book = require('./models/Book')
const Author = require('./models/Author')
const Genre = require('./models/Genre')
const BookInstance = require('./models/BookInstance')

let genres = []
let authors = []
let books = []
let bookinstances = []

async function createAuthor ({
  first_name, family_name, d_birth, d_death
}) {
  const author = new Author({
    first_name, family_name,
    date_of_birth: d_birth, 
    date_of_death: d_death
  })

  await author.save()
  authors.push(author)
  console.log(`created an author - ${author.name}`)
}

async function createGenre (name) {
  const genre = new Genre({ name })

  await genre.save()
  genres.push(genre)
  console.log(`Added a genre to DB - ${name}`)
}

async function createBook ({
  title, summary, isbn, author, genre
}) {
  const bookDetails = { title, summary, author, isbn }

  if (genre) {
    bookDetails.genre = genre
  }

  const book = new Book(bookDetails)
  await book.save()
  books.push(book)
  console.log(`Added a book - ${title}`)
}

async function createBookInstance ({
  book, imprint, due_back, status, isbn
}) {
  const bookInstanceDetail = {
    book, imprint, isbn
  }

  if (due_back) { bookInstanceDetail.due_back = due_back }
  if (status) { bookInstanceDetail.status = status }

  const bookInstance = new BookInstance(bookInstanceDetail)
  await bookInstance.save()
  console.log(`added a book-instance - ${book.title}`)
}

async function createGenres () {
  return Promise.all(
    ['Fantasy', 'Science Fiction', 'French Poetry'].map(
      genre => createGenre(genre)
    )
  )
}

async function createAuthors () {
  const authorDetails = [
    ["Patrick", "Rothfuss", "1973-06-06", null],
    ["Ben", "Bova", "1932-11-8", null],
    ["Isaac", "Asimov", "1920-01-02", "1992-04-06"],
    ["Bob", "Billings", null, null],
    ["Jim", "Jones", "1971-12-16", null]
  ]

  return Promise.all(
    authorDetails.map(entry => createAuthor({
      first_name: entry[0],
      family_name: entry[1],
      d_birth: entry[2],
      d_death: entry[3]
    }))
  )
}

async function createBooks () {
  const findAuthor = name => authors.find(author => author.name === name)
  const findGenre = genre => genres.find(gen => gen.name === genre)

  return Promise.all(
    dummyBooks.map(book => createBook({
      title: book.title,
      summary: book.summary,
      isbn: book.isbn,
      author: findAuthor(book.authorName),
      genre: book.genres.map(genre => findGenre(genre))
    }))
  )
}

async function createBookInstances () {
  const findBook = isbn => books.find(book => book.isbn === isbn)

  return Promise.all([
    dummyBookInstances.map(entry => createBookInstance({
      book: findBook(entry.isbn),
      isbn: entry.isbn,
      imprint: entry.imprint,
      status: entry.status,
      due_back: entry.due_back
    }))
  ])
}

async function clearDB () {
  genres = []
  authors = []
  books = []
  bookinstances = []

  try {
    await Book.deleteMany()
    await BookInstance.deleteMany()
    await Author.deleteMany()
    await Genre.deleteMany()
  } catch (err) {
    console.error(`error occured while clearing up the DB: `, err)
  }
}

async function main () {
  const wait = ms => new Promise(res => setTimeout(res, ms))
  console.log("Debug: About to connect");
  try {
    await mongoose.connect(DB_CONNECTION_STRING);

    await clearDB()
    await createGenres();
    await createAuthors();
    await createBooks();
    await createBookInstances();
    await wait(3000)
  } catch (err) {
    console.error('error in populate-db: ', err)
  } finally {

  }
}

// execute
main().then(() => {
  mongoose.connection.close()
})
