import React, { useEffect } from 'react'
import Comments from './Comments';
import './UserComment.css';
const UserComment = ({comments}) => {

  return (
    <div className='col c-12 l-12 m-12'>
      <div className='users_comment'>
        {comments?.map(item => (
          <Comments comment={item} key={item._id} />
          ))}
      </div>
    </div>
  )
}

export default UserComment