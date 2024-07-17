import express from 'express';
import { books as mockData} from './mock-data';

const makeId = (prefix = '', length = 12) =>
    `${prefix}${Math.random()
        .toString(16)
        .slice(-(length - 15))}`;

const findBook = (id: string) => books.find(book => book.id === id);

// add id and updated fields to the mock-data
let books = [...mockData].map((book) => ({
    ...book,
    id: makeId(),
    updated: `${Date.now()}`,
}))

const app = express();
const port = 3001;

app.use(express.json());

// Routes
app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const newBook = {
        id: makeId(),
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published: req.body.published,
        updated: `${Date.now()}`,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const selectedBook = findBook(id);

    if (!selectedBook) {
        return res.status(404).json({ message: `Book id:${id} not found` });
    }
    const updatedBook = {
        id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published: req.body.published,
        updated: `${Date.now()}`,
    };

    books = books.map((book) => book.id === id ? updatedBook : book);
    res.status(200).json(updatedBook);
    
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const selectedBook = findBook(id);

    if (!selectedBook) {
        return res.status(404).json({ message: `Book id:${id} not found` });
    }

    books.filter((book) => book.id !== selectedBook.id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
