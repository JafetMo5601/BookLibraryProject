import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import Pagination from './Pagination';

const TableWithPagination = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.apiUrl}/books?page=${page}&pageSize=5`);
            setData(response.data);
            const totalBooks = await axios.get(`${config.apiUrl}/books`);
            const totalPages = Math.ceil(totalBooks.data.length / 5);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const filteredData = data.filter(book => {
        if (book && book.title) {
            const title = book.title.toLowerCase();
            return title.includes(searchQuery.toLowerCase());
        }
        return false;
    });

    return (
        <div className="my-4">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(book => (
                                <tr key={book.book_id}>
                                    <td>{book.title}</td>
                                    <td>{`${book.first_name} ${book.last_name}`}</td>
                                    <td>{`${book.type}`}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.category}</td>
                                    <td>{book.total_copies - book.copies_in_use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default TableWithPagination;
