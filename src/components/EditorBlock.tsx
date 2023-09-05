import { randomUUID } from 'crypto'
import { useState } from 'react'
import { Author } from './Author'
import { color } from '../services/Color'
import { PostObj } from './Post'
import { v4 as uuidv4 } from 'uuid';
import { outMessageType } from '../services/SomeTypes'

type EditorBlockType = {
    author: Author | null,
    // getNewPost: (post: PostObj) => void,
    // sendMessage : (outMessage: string) =>void,
    getPost : (newPost: PostObj) => void,
    //setOutMessage : (prev : outMessageType ) => void
}

export const EditorBlock = ({ author, getPost}: EditorBlockType) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handlePost = () => {
        let post: PostObj = {
            id: uuidv4(),
            title: title,
            content: content,
            created: new Date(Date.now()),
            author: author!
        }
        setTitle("");
        setContent("");
        (post.content !== "") && getPost(post);
        //getNewPost(post);
    }

    return (
        <div className='EditorBlock'
            style={{ backgroundColor: color.c4 }}>
            <div className='Editor-Author'>
                <img className='avatar' src={author?.avatar} />
                <span>Author: {author?.name}</span>
            </div>
            {/* <div className='Editor-Title'>
                <span>Title</span>
                <input onChange={(e) => setTitle(e.target.value)}
                    value={title}></input>
            </div> */}
            <input className='Editor-Content' onChange={e => setContent(e.target.value)} value={content} />
            <button
                className='PostBtn'
                style={{ backgroundColor: color.c1 }}
                onClick={handlePost}>
                Post
            </button>
        </div>
    )
}