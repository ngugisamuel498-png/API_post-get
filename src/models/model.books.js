
import mongoose from 'mongoose';
import { schoolDB, myApp } from '../config/db.js';

    const bookSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        pages: {
            type: Number,
        },
        reviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Review'
        }
    });


    const schoolBookModel = schoolDB.model('Book', bookSchema);
    const myAppBookModel = myApp.model('Book', bookSchema);

export {schoolBookModel, myAppBookModel};