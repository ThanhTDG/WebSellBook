import React from 'react';
import ReactPaginate from 'react-paginate';
import './booksNavButtons.scss';
import { useStore, actions } from '../../store';

const BookBavButtonsOther = (props) => {
    const [state, dispatch] = useStore()
    console.log(state)
    const {booksNavButtons} = state
    const items = booksNavButtons.totalPages
    console.log('render option')

    const focePage = props.focePage
    console.log(focePage)
    
    const pageCount = items
    const onHandlePageChange = (event) => {
        const newOffset = (event.selected +1) 
        dispatch(actions.selectBooksNavigationButton(newOffset))
        //setItemOffset(newOffset);
    }

    
    return (
        <div className='books-paginated-container'>
            <ReactPaginate
                nextLabel=">"
                onPageChange={onHandlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.focePage}
            />
        </div>
    );
}

export default BookBavButtonsOther;