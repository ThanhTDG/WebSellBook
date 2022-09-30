import React from 'react';

const AddToFavoriteButton = (props) => {
    const mtop = props.top;
    const buttonStyle ={
        'font-family': "Montserrat",
        'font-size': '16px',
        color: 'var(--White)',
        height: '48px',
        width: '200px',
        border: 'none',
        'border-radius': '24px',
        'background-color': 'var(--Gray)',
        position:'relative',
        'margin-top':`${mtop}px`
    }
    const imgStyle={
        width :'32px',
        height:'32px',
        left:'16px',
        top:'8px',
        position:'absolute',
        
    }
    function onFavoriteClick(e){
       if(e.target.style.backgroundColor === `var(--Gray)`){
            e.target.style.backgroundColor = `var(--Pink)`
       }else{
        e.target.style.backgroundColor = `var(--Gray)`
       }
    }
    return (
        <div>
            <button style={buttonStyle} 
            onClick={(e)=>onFavoriteClick(e)}
            ><img style={imgStyle} 
            src={require('../../assets/icons/ic-favorite-white.png')} 
            alt='icon favorite'
            />Yêu thích</button>
        </div>
    );
}

export default AddToFavoriteButton;
