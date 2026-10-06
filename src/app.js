import express from 'express';
import { schoolBookModel, myAppBookModel } from './models/model.books.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();

app.use(express.json());
const port  = process.env.PORT || 3000;
dotenv.config({path: '../.env'});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}
    startServer();


    app.get('/api/books', async (req, res) => {
        try {
            const books = await schoolBookModel.find();
            res.json(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

app.get('/api/books/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        const book = await schoolBookModel.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/books', async (req, res) => {
    try {
      const postBook = await myAppBookModel.create(req.body);
      res.status(201).json(postBook);
      console.log('Book created successfully:', postBook);
    }catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
