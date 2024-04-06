import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableWithPagination from './components/TableWithPagination';
import AddBookForm from './components/AddBookForm';
import './App.css'; // Import CSS file for custom styles

function App() {
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const handleToggleForm = () => {
    setShowAddBookForm(!showAddBookForm);
  };

  return (
    <Container className="app-container">
      <div className="title-container">
        <h1 className="text-center">Royal Library</h1>
      </div>
      <div className="toggle-form-container">
        <Button variant="primary" onClick={handleToggleForm} className="mb-3">
          {showAddBookForm ? 'Hide Add Book Form' : 'Show Add Book Form'}
        </Button>
      </div>
      <div className={`content-container${showAddBookForm ? ' show-form' : ''}`}>
        {showAddBookForm ? (
          <AddBookForm showAddBookForm={showAddBookForm} setShowAddBookForm={setShowAddBookForm} />
        ) : (
          <TableWithPagination />
        )}
      </div>
    </Container>
  );
}

export default App;
