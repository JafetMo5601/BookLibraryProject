import React, { useState, useEffect } from 'react';
import { Table, Spinner, ButtonGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import Pagination from './Pagination';
import ConfirmationModal from './ConfirmationModal'; 
import SearchBar from './SearchBar'; 

const TableWithPagination = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [action, setAction] = useState('');
    const [updatedData, setUpdatedData] = useState({});
    const [editableField, setEditableField] = useState({ id: null, field: null });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.apiUrl}/books?page=${page}&pageSize=5`);
            setData(response.data.books);
            setTotalPages(Math.ceil(response.data.totalCount / 5));
        } catch (error) {
            setErrorMessage('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleDelete = async (id) => {
        setSelectedBookId(id);
        setAction('delete');
        setShowModal(true);
    }

    const handleUpdate = async () => {
        try {
            const updatedBook = { ...data.find(book => book.book_id === selectedBookId), ...updatedData[selectedBookId] };
            if (updatedBook.authors) {
                const [firstName, lastName] = updatedBook.authors.split(' '); // Split full name into first name and last name
                updatedBook.first_name = firstName;
                updatedBook.last_name = lastName;
                delete updatedBook.authors;
            }
            await axios.put(`${config.apiUrl}/books/${selectedBookId}`, updatedBook);
            setShowModal(false);
            fetchData(currentPage);
        } catch (error) {
            setErrorMessage('Error updating book. Please try again later.');
        }
    }

    const handleEditField = (id, field, value) => {
        if (field !== 'available_copies') {
            setEditableField({ id, field });
            if (field === 'authors') {
                // If editing authors, split full name into first name and last name
                const [firstName, lastName] = value.split(' ');
                setUpdatedData({ ...updatedData, [id]: { ...updatedData[id], 'first_name': firstName, 'last_name': lastName } });
            } else {
                setUpdatedData({ ...updatedData, [id]: { ...updatedData[id], [field]: value } });
            }
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleInputChange = (e, id, field) => {
        if (field === 'authors') {
            const value = e.target.value;
            setUpdatedData({ ...updatedData, [id]: { ...updatedData[id], [field]: value } });
        } else {
            handleEditField(id, field, e.target.value);
        }
    }

    const handleConfirmAction = async () => {
        try {
            if (action === 'delete') {
                await axios.delete(`${config.apiUrl}/books/${selectedBookId}`);
            } else if (action === 'update') {
                await handleUpdate();
            }
            setShowModal(false);
            fetchData(currentPage);
        } catch (error) {
            setErrorMessage('Error performing action. Please try again later.');
        }
    }

    const renderTableCell = (id, field, value) => {
        if (editableField.id === id && editableField.field === field && field !== 'available_copies') {
            return <input type="text" value={updatedData[id]?.[field] || value} onChange={(e) => handleInputChange(e, id, field)} />;
        } else {
            return <span onClick={() => handleEditField(id, field, value)}>{value}</span>;
        }
    }

    const filteredData = data.filter(book => {
        if (book && book.title) {
            const title = book.title.toLowerCase();
            return title.includes(searchQuery.toLowerCase());
        }
        return false;
    });

    return (
        <div className="my-4">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} /> {/* Render the SearchBar component */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Authors</th>
                                <th>Type</th>
                                <th>ISBN</th>
                                <th>Category</th>
                                <th>Available Copies</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(book => (
                                <tr key={book.book_id}>
                                    <td>{renderTableCell(book.book_id, 'title', book.title)}</td>
                                    <td>{renderTableCell(book.book_id, 'authors', `${book.first_name} ${book.last_name}`)}</td>
                                    <td>{renderTableCell(book.book_id, 'type', book.type)}</td>
                                    <td>{renderTableCell(book.book_id, 'isbn', book.isbn)}</td>
                                    <td>{renderTableCell(book.book_id, 'category', book.category)}</td>
                                    <td>{book.total_copies - book.copies_in_use}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button variant="warning" onClick={() => { setSelectedBookId(book.book_id); setAction('update'); setShowModal(true); }}><i className="bi bi-pencil-fill"></i></Button>
                                            <Button variant="danger" onClick={() => handleDelete(book.book_id)}><i className="bi bi-trash-fill"></i></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <ConfirmationModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleConfirm={handleConfirmAction}
                        action={action === 'delete' ? 'delete' : 'update'}
                    />
                </>
            )}
        </div>
    );
}

export default TableWithPagination;
