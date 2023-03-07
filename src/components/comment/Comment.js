import React, { useRef } from 'react'
import './Comment.css';
const Comment = ({user,socket,image,slug,product_id}) => {

  const content = useRef("");
  const handleCreate = () => {
    socket.emit("createComment",{
      userid:user._id,
      slug,
      content:content.current.value,
      avatar:user.avatar,
      username:user.name,
      product_id
    });
    content.current.value = "";
  }
  return (
    <div className='col c-12 m-12 l-12'>
      <div className='comment_container'>
          <div className='image_comment'>
              <img src={image} />
              <textarea type="text" defaultValue={content.current.value} ref={content} placeholder='Viết bình luận về sản phẩm.'/>
              <button onClick = {handleCreate}>Đăng</button>
          </div>
      </div>
    </div>
  )
}

export default Comment