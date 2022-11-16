import React, { useState } from 'react';
import './Login.scss'
import Modal from 'react-modal'

const Login = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <button onClick={toggleModal}>Open modal</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
            >
                <div>My modal dialog.</div>
                <button onClick={toggleModal}>Close modal</button>
            </Modal>
        </div>
    );
}

export default Login;
