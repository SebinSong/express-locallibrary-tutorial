/*
  - Fake authors
  "Patrick Rothfuss",
  "Ben Bova",
  "Isaac Asimov",
  "Bob Billings",
  "Jim Jones"

  - Fake genres
  'Fantasy',
  'Science Fiction',
  'French Poetry'
*/

exports.books = [
  {
    title: "The Name of the Wind (The Kingkiller Chronicle, #1)",
    summary: "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
    isbn: "9781473211896",
    authorName: "Jim Jones",
    genres: ['Fantasy']
  },
  {
    title: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    summary: "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
    isbn: "9788401352836",
    authorName: "Isaac Asimov",
    genres: ['Fantasy']
  },
  {
    title: "The Slow Regard of Silent Things (Kingkiller Chronicle)",
    summary: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
    isbn: "9780756411336",
    authorName: "Bob Billings",
    genres: ['Fantasy', 'Science Fiction']
  },
  {
    title: "Apes and Angels",
    summary: "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
    isbn: "9780765379528",
    authorName: "Jim Jones",
    genres: ['French Poetry']
  },
  {
    title: "Death Wave",
    summary: "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
    isbn: "9780765379504",
    authorName: "Patrick Rothfuss",
    genres: ['Science Fiction']
  },
  {
    title: "Test Book 1",
    summary: "Summary of test book 1",
    isbn: "ISBN111111",
    authorName: "Jim Jones",
    genres: ['Fantasy', 'Science Fiction']
  }
]

exports.bookInstances = [
  {
    bookTitle: 'Death Wave',
    isbn: '9780765379504',
    imprint: "London Gollancz, 2014.",
    due_back: null,
    status: 'Available'
  },
  {
    bookTitle: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    isbn: '9788401352836',
    imprint: "Gollancz, 2011.",
    due_back: null,
    status: 'Loaned'
  },
  {
    bookTitle: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    isbn: '9788401352836',
    imprint: "Gollancz, 2015.",
    due_back: null,
    status: null
  },
  {
    bookTitle: "Apes and Angels",
    isbn: '9780765379528',
    imprint: "New York Tom Doherty Associates, 2016.",
    due_back: null,
    status: 'Available'
  },
  {
    bookTitle: "Apes and Angels",
    isbn: '9780765379528',
    imprint: "New York Tom Doherty Associates, 2016.",
    due_back: null,
    status: 'Available'
  },
  {
    bookTitle: "Apes and Angels",
    isbn: '9780765379528',
    imprint: "New York Tom Doherty Associates, 2016.",
    due_back: null,
    status: 'Available'
  },
  {
    bookTitle: "Test Book 1",
    isbn: 'ISBN111111',
    imprint: "NY Tom Doherty Associates, LLC, 2015.",
    due_back: null,
    status: 'Maintenance'
  },
  {
    bookTitle: "The Slow Regard of Silent Things (Kingkiller Chronicle)",
    isbn: '9780756411336',
    imprint: "NY Tom Doherty Associates, LLC, 2015.",
    due_back: null,
    status: 'Loaned'
  },
  {
    bookTitle: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    isbn: '9788401352836',
    imprint: "Imprint XXX2",
    due_back: null,
    status: null
  },
  {
    bookTitle: "The Name of the Wind (The Kingkiller Chronicle, #1)",
    isbn: '9781473211896',
    imprint: "Imprint XXX1",
    due_back: null,
    status: null
  }
]