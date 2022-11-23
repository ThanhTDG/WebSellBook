import React from 'react';
import './SearchSuggest.scss'

const SearchSuggest = (props) => {
    const title = props.title
    return (
        <div className='search-suggest-item-container' onClick={() => props.onSelectSuggestSearch(props.title)}>
            <span>{title}</span>
            <button>
                <img src={require('../../../assets/icons/ic-suggest-search.png')} alt='option' />
            </button>
        </div>
    );
}

export default SearchSuggest;
