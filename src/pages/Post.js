import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function Post() {
const[postObject,setPostObject]=useState({})
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");

    let {id}=useParams()
useEffect(()=>{
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
        setPostObject(response.data);
       })


       axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
        setComments(response.data);
       })
},[])

const addComment =()=>{
    axios.post("http://localhost:3001/comments",
    {
        commentBody:newComment,
        PostId:id
    },
    {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((response)=>{
        if (response.data.error) {
            alert(response.data.error);
          } 
          else{
        const commentToAdd={commentBody:newComment}
       setComments([...comments,commentToAdd]);
       setNewComment("")
          }
    })
}

  return (
    <div className='postPage'>
        <div className='leftSide'>
       <div className='post'id='individual'>
           <div className='title'>{postObject.title}</div>
           <div className='body'>{postObject.postText}</div>
                <div  className='footer'> Name:{postObject.username}<br/>
                Email:{postObject.email}<br/>
                Mobile:{postObject.mobile}</div>
        </div>
        </div>
        <div className='rightSide'>Comment Section
        <div className='addCommentContainer'>
            <input type='text' placeholder='comment...' autoComplete='off' onChange={(e)=>{setNewComment(e.target.value)}}/>
            <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
            {comments.map((comment,key)=>{
                return(
                <div key={key} className='comment'>{comment.commentBody}</div>)
            })}
        </div>
        </div>
        

    </div>
  )
}

export default Post;