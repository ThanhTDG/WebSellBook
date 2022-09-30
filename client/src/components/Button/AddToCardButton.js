import React from 'react';

const AddToCardButton = () => {
    const buttonStyle = {
        'font-family': "Montserrat",
        'font-size': '16px',
        color: 'var(--White)',
        height: '48px',
        width: '200px',
        border: 'none',
        'border-radius': '24px',
        'background-color': 'var(--Pink)',
    }
    return (
        <div>
            <button style={buttonStyle}>Thêm vào giỏ hàng</button>
        </div>
    );
}

export default AddToCardButton;
