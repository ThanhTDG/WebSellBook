import React from 'react';

const CategoryTag = (props) => {
    const categoryContainerStyle = {
        height: '48px',
        border: 'none',
        borderRadius: '24px',
        backgroundColor: 'var(--LightGray)',
        paddingLeft: '24px',
        paddingRight: '24px',
        fontFamily: 'MontserratRegular',
        fontSize: '16px',
        marginRight: '12px',
        display:'inline-block',
        marginTop:'12px'
    }
    const categoryTagContainerStyle={
        display:'inline'
    }
    return (
        <div style={categoryTagContainerStyle} className='category-tags-container' >
            <button style={categoryContainerStyle}>
                <div>{props.category.name}</div>
            </button>
        </div>
    );
}

export default CategoryTag;
