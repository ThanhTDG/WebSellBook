import React from 'react';
import './booksNavButtons.scss';
import { useStore, actions } from '../../store';

const BooksNavButtons = () => {
    const [state, dispatch] = useStore()
    
    function onNavBooksButton(e, index){
        let buttons = document.getElementsByClassName('books-nav-button')
        for(let i=0; i<buttons.length; i++){
            buttons[i].style.backgroundColor = 'transparent'
            buttons[i].style.color = 'var(--Brown)'
            buttons[i].style.boxShadow = 'none'
        }
        e.target.style.backgroundColor = 'var(--Pink)'
        e.target.style.color = 'var(--White)'
        e.target.style.boxShadow = '0px 1px 8px rgba(0,0,0,0.3)'
    }
    function renderNavButtons(){
        var toRender =[]
        const maxSize = state.booksNavButtons.totalPages >5? 5: state.booksNavButtons.totalPages
        toRender.push(
            <button className='books-nav-option-button'>
                <img src={require('../../assets/icons/ic-previou.png')} alt='next'/>
            </button>
        )
        for(let i =1; i<=maxSize; i++){
            toRender.push(
                <button className='books-nav-button' onClick={(e)=>onNavBooksButton(e, i)}>
                    {i}
                </button>
            )
        }
        toRender.push(
            <button className='books-nav-button'>
                ...
            </button>
        )
        toRender.push(
            <button className='books-nav-button' onClick={(e)=>onNavBooksButton(e, state.booksNavButtons.totalPages)}>
                {state.booksNavButtons.totalPages}
            </button>
        )
        toRender.push(
            <button className='books-nav-option-button'>
                <img src={require('../../assets/icons/ic-next.png')} alt='next'/>
            </button>
        )
        return toRender
    }
    return (
        <div className='books-nav-buttons-container'>
            {
                state.booksNavButtons.totalPages > 1?
                renderNavButtons()
                :''
            }
        </div>
    );
}

export default BooksNavButtons;
