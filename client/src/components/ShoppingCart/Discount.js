import React, { useState } from 'react';
import './Discount.scss'

const Discount = (props) => {
    const [isSelected, setIsSelected] = useState(false)
    function onClickButtonDiscount(){
        setIsSelected(!isSelected)
    }
    const discountContainerStyle={
        border: isSelected===false? '1px solid var(--Gray)': 'none',
        backgroundColor: isSelected===false?'var(--LightGray)': 'var(--White)',
        color: isSelected===false?'var(--DarkGray)': 'var(--Pink)',
        boxShadow:isSelected===false? 'none':'0px 1px 8px var(--Pink)',
        transition: 'box-shadow 0.4s ease',

    }
    return (
        <div className='discount-container' style={discountContainerStyle}>
            <div className='discount-container-top'>
                <img src={require(`../../assets/icons/${isSelected===false? 'discount-img-dark-gray.png':'discount-img.png' }`)} alt='discount img' />
                <div className='discount-content-container'>
                    <div className='discount-value'>{props.discountData.value}%</div>
                    <div className='discount-name'>{props.discountData.name}</div>
                </div>
            </div>
            <div className='discount-container-desciption'>
                {props.discountData.description}
            </div>
            <div className='discount-container-option'>
                <span>Sử dụng</span>
                <button onClick={onClickButtonDiscount}>
                    <img src={require(`../../assets/icons/${isSelected===false?'ic-toggle.png':'ic-toggle-active.png' }`)} alt='ic-toggle'/>
                </button>
            </div>
        </div>
    );
}

export default Discount;
