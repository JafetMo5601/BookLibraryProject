import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormGroup from './FormGroup';
import config from '../config';
import axios from 'axios';
import MessageModal from './MessageModal';

const AddBookForm = ({ setShowAddBookForm, showAddBookForm }) => {
    const [bookData, setBookData] = useState({
        title: '',
        first_name: '',
        last_name: '',
        totalCopies: '',
        copiesInUse: '',
        type: '',
        isbn: '',
        category: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    
    const addBook = async (bookData) => {
        try {
            const response = await axios.post(`${config.apiUrl}/Books`, bookData);
            setShowConfirmationModal(true);
        } catch (error) {
            setErrorMessage('Error creating the book. Please try again later.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        const { title, first_name, last_name, totalCopies, copiesInUse, type, isbn, category } = bookData;

        if (!title) validationErrors.title = 'Title is required';
        if (!first_name) validationErrors.first_name = 'First name is required';
        if (!last_name) validationErrors.last_name = 'Last name is required';
        if (!totalCopies || isNaN(totalCopies)) validationErrors.totalCopies = 'Total copies must be a number';
        if (!copiesInUse || isNaN(copiesInUse)) validationErrors.copiesInUse = 'Copies in use must be a number';
        if (!type) validationErrors.type = 'Type is required';
        if (!isbn) validationErrors.isbn = 'ISBN is required';
        if (!category) validationErrors.category = 'Category is required';

        if (Object.keys(validationErrors).length === 0) {
            addBook(bookData);
        } else {
            setErrors(validationErrors);
        }
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setShowAddBookForm(!showAddBookForm);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className='row'>
                <FormGroup controlId="title" label="Title" type="text" name="title" value={bookData.title} onChange={handleChange} error={errors.title} />
            </div>
            
            <div className="row">
                <div className="col">
                    <FormGroup controlId="first_name" label="First Name" type="text" name="first_name" value={bookData.first_name} onChange={handleChange} error={errors.first_name} />
                </div>
                <div className="col">
                    <FormGroup controlId="last_name" label="Last Name" type="text" name="last_name" value={bookData.last_name} onChange={handleChange} error={errors.last_name} />
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <FormGroup controlId="totalCopies" label="Total Copies" type="number" name="totalCopies" value={bookData.totalCopies} onChange={handleChange} error={errors.totalCopies} />
                </div>
                <div className='col'>        
                    <FormGroup controlId="copiesInUse" label="Copies in Use" type="number" name="copiesInUse" value={bookData.copiesInUse} onChange={handleChange} error={errors.copiesInUse} />
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-6 d-flex align-items-center justify-content-center">
                    <FormGroup controlId="type" label="Type" type="text" name="type" value={bookData.type} onChange={handleChange} error={errors.type} />
                </div>
                <div className="form-group col-md-4">
                <FormGroup controlId="isbn" label="ISBN" type="text" name="isbn" value={bookData.isbn} onChange={handleChange} error={errors.isbn} />
                </div>
                <div className="form-group col-md-2">
                    <FormGroup controlId="category" label="Category" type="text" name="category" value={bookData.category} onChange={handleChange} error={errors.category} />
                </div>
            </div>
            <Button variant="primary" type="submit">
                Add Book
            </Button>

            <MessageModal 
                title="Book Created"
                show={showConfirmationModal} 
                message="The book has been successfully added."
                handleClose={handleCloseConfirmationModal}
                btnMessage="Close"
            />
        </Form>
    );
};

export default AddBookForm;