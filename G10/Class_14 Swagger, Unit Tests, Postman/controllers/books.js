const books = [
  {
    id: 1,
    name: "Harry Poter 1",
    author: "J.K. Rolling",
  },
  {
    id: 2,
    name: "Harry Poter 2",
    author: "J.K. Rolling",
  },
];

exports.getAllBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id == id);
  if (!book) {
    return res.status(404).json({ message: "No book found with that id" });
  }
  res.json(book);
};

exports.createNewBook = (req, res) => {
  const newBook = req.body;
  books.push({ ...newBook, id: books.length + 1 });
  res.status(201).json({ success: true, id: books.length });
};
