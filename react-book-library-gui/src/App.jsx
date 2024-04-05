import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableWithPagination from './components/TableWithPagination';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to perform search if needed
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h1 className="text-center mb-4">Royal Library</h1>
        {/* <FilterTable
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        /> */}
        <TableWithPagination searchQuery={searchQuery} />
      </div>
    </Container>
  );
}

const FilterTable = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <Form onSubmit={onSearchSubmit}>
      <Row className="mb-3">
        {/* <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col> */}
      </Row>
    </Form>
  );
}

export default App;
