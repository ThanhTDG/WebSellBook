import React from 'react';
import { FakeData } from '../../variables/FakeData';
import { MyVariable } from '../../variables/variables';
import './commentComponent.scss'
import { commentID } from './commentIDRender';

const CommentComponent = (props) => {
    const stars=[]
    var rating= ''
    var ratingStyle={}
    switch(props.comment.ratingPoint){
        case 1:
            rating = 'Cần cải thiện nhiều'
            ratingStyle = {color:'var(--DarkOrange)'}
            break;
        case 2:
            rating = 'Cần cố gắng hơn'
            ratingStyle = {color:'var(--DarkBlue)'}
            break;
        case 3:
            rating = 'Một số điểm còn thiếu sót'
            ratingStyle = {color:'var(--Blue)'}
            break;
        case 4:
            rating = 'Tương đối hài lòng'
            ratingStyle = {color:'var(--LightBlue)'}
            break;
        case 5:
            rating = 'Rất hài lòng'
            ratingStyle = {color:'var(--Orange)'}
            break;
        default:
            rating=''
            break
    }
    for(let i=1; i<=5; i++){
        stars.push({
            order: i,
            image: i<=props.comment.ratingPoint?'/assets/icons/ic-active-star.png':'/assets/icons/ic-none-star.png'
        })
    }
    var commentContentOptionButtonStyle={
        visibility: props.comment.content.length>270?'visible':'hidden'
    }
    var commentContent = props.comment.content.length>270?props.comment.content.substr(0,270) :props.comment.content
    function onShowMoreCommentContent(e,content) {
        var num = e.target.id.substr(12, e.target.id.length-1)
        console.log(`${num},${e.target.id}`)
        var ddes = document.getElementById(`for-comment-content-${num}`)
        ddes.innerHTML = `${content}`
        // var nbtn = document.getElementById(`btn-narrow-${num}`)
        // console.log(nbtn)
        // e.target.style.visibility = "hidden"
        // if(nbtn === null){
        //     var button = document.createElement('button')
        //     button.innerHTML = ' thu nhỏ'
        //     button.className = 'commentContentOptionButtonStyle'
        //     button.id = renderCommentButtonNarrowID('btn-narrow')
        //     button.addEventListener('click', (e) => onNarrowCommentContent(e,content))
        //     ddes.appendChild(button)
        //     console.log('create r')
        // }else{
        //     nbtn.style.display='block'
        // }
    }
    // function onNarrowCommentContent(e,content) {
    //     var num = e.target.id.substr(11, e.target.id.length-1)
    //     console.log(`${num},${e.target.id}`)
    //     var ddes = document.getElementById(`for-comment-content-${num}`)
    //     ddes.innerHTML = `${content.length > 270 ? content.substr(0, 270) : content}`
    //     var ebtn = document.getElementById(`btn-comment-${num}`)
    //     console.log(ebtn)
    //     e.target.style.visibility = "hidden"
    //     if(ebtn === null){
    //         var button = document.createElement('button')
    //         button.innerHTML = ' ... xem thêm'
    //         button.className = 'commentContentOptionButtonStyle'
    //         button.id=renderCommentButtonID('btn-comment')
    //         button.addEventListener('click', (e) => onShowMoreCommentContent(e,content))
    //         ddes.appendChild(button)
    //         console.log('create e')
    //     }else{
    //         ebtn.display='block'
    //     }
    // }
    function renderCommentID(){
        commentID.commentIDCount+=1
        return `for-comment-content-${commentID.commentIDCount-1}`
    }
    function renderCommentButtonID(rawID){
        commentID.commentButtonCount+=1
        return `${rawID}-${commentID.commentButtonCount-1}`
    }
    // function renderCommentButtonNarrowID(rawID){
    //     commentID.commentButtonNarrowCount+=2
    //     return `${rawID}-${commentID.commentButtonNarrowCount-1}`
    // }
    return (
        <div className='row commment-container'>
            <div className='col-1'>
                <img className='user-avatar' src={`${MyVariable.hostName}${props.user.avatar}`} alt='userAvatar'/>
            </div>
            <div className='col-11 user-detail-container'>
                <span className='user-responsive-name'>{props.user.name}</span>
                <span className='user-responsive-description'>{props.user.description}</span>
                <div className='comment-content-container'>
                    <div className='rating-info'>
                        {stars.map((star)=>(
                            <img className='star-image' src={`${MyVariable.hostName}${star.image}`} alt='star'/>
                        ))}
                        <span id='rating-info-title' style={ratingStyle}>{rating}</span>
                    </div>
                    <div className='rating-content' id={renderCommentID()}>
                    {commentContent}<button id={renderCommentButtonID('btn-comment')} className='commentContentOptionButtonStyle' style={commentContentOptionButtonStyle} onClick={(e)=>onShowMoreCommentContent(e,props.comment.content)}>... xem thêm</button>
                    </div>
                    <div className='comment-date'>
                        {props.comment.sendDate}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentComponent;
