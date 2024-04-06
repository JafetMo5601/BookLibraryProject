import { DropdownButton, Dropdown } from 'react-bootstrap';

const DropdownFilter = ({ title, items, onClick }) => {
    return (
        <DropdownButton id={`dropdown-${title.toLowerCase().replace(' ', '-')}`} title={title} className="mx-2 my-2">
            {items.map(item => (
                <Dropdown.Item key={item} onClick={() => onClick(item)}>{item}</Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default DropdownFilter;