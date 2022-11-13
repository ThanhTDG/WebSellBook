import React, {useState, useEffect} from 'react';
import { FakeData } from '../../../variables/FakeData';
import CommentComponent from '../commentComponent';
import LoadingComent from '../Loading/LoadingComent';
import * as CommentSv from '../../../apiServices/commentServices';

const Comments = (props) => {
    const bookId = props.bookId
    const [isLoading, setIsLoading] = useState(true)
    const [apiComment, setApiComment] = useState([])

    const fetchApiDetail = async (id) => {
        const commentResult = await CommentSv.comments(id)
        setIsLoading(false)
        setApiComment(commentResult.docs)
        console.log(commentResult)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchApiDetail(bookId)
    }, [bookId])

    const renderLoadingComment=<div>
        {
            FakeData.books.map((item)=>(
                <LoadingComent/>
            ))
        }
    </div>

    const renderComment=<div>
        {
            isLoading===false && apiComment.length>0?
            apiComment.map((comment)=>(
                <CommentComponent commentData={comment} comment={FakeData.comments[0]} user={FakeData.users[0]} />
            )):
            <span className='anoun-title'>Chưa có bài đánh giá nào cả.</span>
        }
    </div>
    return (
        <div>
            {
                isLoading===true?
                renderLoadingComment:
                renderComment
            }
        </div>
    );
}

export default Comments;
