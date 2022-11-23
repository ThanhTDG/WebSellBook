import React, { useState, useEffect } from 'react';
import { FakeData } from '../../../variables/FakeData';
import CommentComponent from '../commentComponent';
import LoadingComent from '../Loading/LoadingComent';
import * as CommentSv from '../../../apiServices/commentServices';
import './Comments.scss'

const Comments = (props) => {
    const bookId = props.bookId
    const [isLoading, setIsLoading] = useState(true)
    const [apiComment, setApiComment] = useState([])
    const [page, setPage]=useState(1)
    const [comments, setComments] = useState([])

    const fetchApiDetail = async (id, page) => {
        const commentResult = await CommentSv.comments(id, page)
        setIsLoading(false)
        setApiComment(commentResult.docs)
        setComments(comments.concat(commentResult.docs))
        console.log(commentResult)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchApiDetail(bookId, page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId])

    useEffect(() => {
        setIsLoading(true)
        fetchApiDetail(bookId, page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const renderLoadingComment = <div>
        {
            FakeData.books.map((item) => (
                <LoadingComent />
            ))
        }
    </div>

    function getMoreComment(){
        setPage(page+1)
    }

    const renderComment = <div>
        {
            isLoading === false && comments.length > 0 ?
                <div>
                    {
                        comments.map((comment) => (
                            <CommentComponent commentData={comment} comment={FakeData.comments[0]} user={FakeData.users[0]} />
                        ))
                    }
                    <div className='showmore-comment-button-container'>
                        <button onClick={()=>getMoreComment()} className='get-comments-button'>Xem thêm</button>
                    </div>
                </div> :
                <span className='anoun-title'>Chưa có bài đánh giá nào cả.</span>
        }
    </div>
    return (
        <div>
            {
                isLoading === true ?
                    renderLoadingComment :
                    renderComment
            }
        </div>
    );
}

export default Comments;
