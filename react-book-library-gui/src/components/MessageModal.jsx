import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ title, show, message, handleClose, btnMessage }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant={isHovered ? 'secondary' : 'primary'} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave} 
                    onClick={handleClose}
                >
                    {btnMessage}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
