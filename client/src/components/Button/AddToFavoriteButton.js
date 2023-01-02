import React, { useState} from 'react';
import './AddToFavoriteButton.scss'
import * as FavoriteServices from '../../apiServices/FavoriteServices'
import { useStore, actions } from '../../store';

const AddToFavoriteButton = (props) => {
    const [isSelected, setIsSelected] = useState(props.isSelected)
    const [state, dispatch] = useStore()
    const mtop = props.top;
    const buttonStyle = {
        fontFamily: "Montserrat",
        fontSize: '16px',
        color: 'var(--White)',
        height: '48px',
        width: '200px',
        border: 'none',
        borderRadius: '24px',
        backgroundColor: isSelected ? 'var(--Pink)' : 'var(--Gray)',
        position: 'relative',
        marginTop: `${mtop}px`,
    }
    const imgStyle = {
        width: '32px',
        height: '32px',
    }
    const addFavoriteBook = async (bookId) => {
        const respone = await FavoriteServices.addFavoriteBook(bookId)
        console.log('add favorite book', respone)
    }
    const removeFavoriteBook = async (bookId) => {
        const respone = await FavoriteServices.removeFavoriteBook(bookId)
        console.log('remove favorite book', respone)
    }
    async function onFavoriteClick(e) {
        setIsSelected(!isSelected)
        await handleClick()
    }
    const handleClick = async () => {
        const isFavorite = !isSelected
        console.log('is Favorite', !isSelected)
        if (isFavorite) {
            await addFavoriteBook(props.bookId)
        } else {
            await removeFavoriteBook(props.bookId)
        }
        if(props.isFavoritePage){
            dispatch(actions.needUpdateFavoriteBooks(isFavorite))
            console.log('update need favorite')
        }
    }

    return (
        <div>
            <button style={buttonStyle}
                onClick={(e) => onFavoriteClick(e)}
                className='btn-add-to-favorite'>
                <img style={imgStyle}
                    src={require('../../assets/icons/ic-favorite-white.png')}
                    alt='icon favorite'
                    className='btn-add-to-favorite-img' />
                <div className='btn-add-to-favorite-content'>
                    Yêu thích
                </div>
            </button>
        </div>
    );
}

export default AddToFavoriteButton;
