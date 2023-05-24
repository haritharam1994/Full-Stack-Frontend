import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

function Home() {

    const [listOfPost,setListOfPost]=useState([]);
    let navigate = useNavigate ();

    useEffect(()=>{
     axios.get("http://localhost:3001/posts").then((response)=>{
      setListOfPost(response.data);
     })
    
    },[])
  return (
    <div>
        {
      listOfPost.map((value,key)=>(
        
          <div key={key} className='post'onClick={()=>{navigate(`/post/${value.id}`)}}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div  className='footer'> Name:{value.username}<br/>
            Email:{value.email}<br/>
            Mobile:{value.mobile}
            </div>
           
          </div>
        
      ))
    }
    </div>
  )
}

export default Home