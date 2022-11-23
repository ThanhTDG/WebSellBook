import React from 'react';
import './SearchSuggest.scss'

const SearchSuggest = (props) => {
    const title = props.title
    return (
        <div className='search-suggest-item-container'>
            <span>{title}</span>
        </div>
    );
}

export default SearchSuggest;
