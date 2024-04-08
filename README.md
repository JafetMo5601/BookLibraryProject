# BookLibrary Project

### Requirements

1. .NET 7 
1. ReactJS
1. SQL Server Management
1. Bonus: Bootstrap and Axios

### Instructions

To start the project I have containarized all the dependencies in different containers which are orchestraited with docker-compose
so feel free to follow the bellow instructions in order to start the project.

1. Run `docker-compose up --build` in root folder to iniciate the SQL Server, React App and dotnet API projects.

With this you will get the project up and running and you will find the book library as requested via platform instructions.

### Event Handlers used

This section quickly explains the React Event Handlers used for the functionality in the code;
1. onChange event handler for Book creation action, in the `AddBookForm` component to update the state that manages form data by updating state dynamically as users input data into form fields.

```
const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
};

<FormGroup controlId="first_name" label="First Name" type="text" name="first_name" value={bookData.first_name} onChange={handleChange} error={errors.first_name} />
```

2. onSubmit event handler is used in the `AddBookForm` component, the handleSubmit function serves as an event handler for form submission, handling validation and form data submission logic in a React application.

```
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

<Form onSubmit={handleSubmit}></Form> 
```

3. `onClick` and `onHide` event handlers are used in the `ConfirmationModal` component, the `onHide` is responsible for closing the modal when triggered, and the `onClick` was designed to handle the confirmation of an action initiated within the modal. It performs asynchronous actions based on the type of action to be confirmed, such as deleting or updating a book.

```
const ConfirmationModal = ({ show, handleClose, handleConfirm, action }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm {action}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to {action}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;


<ConfirmationModal
    show={showModal}
    handleClose={handleCloseModal}
    handleConfirm={handleConfirmAction}
    action={action === 'delete' ? 'delete' : 'update'}
/>

const handleCloseModal = () => {
    setShowModal(false);
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
```


### Azure Deployment

I have vast of experienece working with AKS, but unfortunately I have not free trial chance since I already use it a couple of years ago, so without resources 
I was no able to upload it to AKS, but of course I can discuss about my strategies to upload it if needed.
