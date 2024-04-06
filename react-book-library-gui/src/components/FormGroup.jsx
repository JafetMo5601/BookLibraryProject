import { Form } from "react-bootstrap";

const FormGroup = ({ controlId, label, type, name, value, onChange, error }) => {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} name={name} value={value} onChange={onChange} />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
    );
}

export default FormGroup;
