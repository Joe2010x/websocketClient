import { randomUUID } from 'crypto'
import { useEffect, useState } from 'react'
import { Author } from './Author'
import { color } from '../services/Color'
import { PostObj } from './Post'
import { v4 as uuidv4 } from 'uuid';
import { outMessageType } from '../services/SomeTypes'
import { InputWithButton } from '../ui/InputText'

type EditorBlockType = {
    author: Author | null,
    changedPost : PostObj | null,
    // getNewPost: (post: PostObj) => void,
    // sendMessage : (outMessage: string) =>void,
    getPost : (newPost: PostObj) => void,
    getChangedPost : (newPost: PostObj) => void,
    //setOutMessage : (prev : outMessageType ) => void
}

export const EditorBlock = ({ author, getPost, changedPost, getChangedPost}: EditorBlockType) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");

    useEffect(() => {
        if (changedPost !== null) {
            console.log("it is changed post", changedPost.content);
            setContent(changedPost.content);
            setPlaceholder(changedPost.content);
        }

    }, [changedPost])

    const handlePost = (text : string) => {
        let post: PostObj = {
            id: changedPost ? changedPost.id : uuidv4(),
            title: title,
            content: text,
            created: new Date(Date.now()),
            author: author!
        }
        setTitle("");
        setContent("");
        if (post.content !== "") {
            if (changedPost) {
                getChangedPost(post);
            }
            else getPost(post);
        }
    }

    return (
        <div className='EditorBlock'
            style={{ backgroundColor: color.c4 }}>
            <div className='Editor-Author'>
                <img className='avatar' src={author?.avatar} />
                <span> {author?.name}</span>
            </div>
            <div className='Editor-Content '>
                {(content || content === "") && <InputWithButton text={content} placeholder={placeholder} getName={handlePost}/>}
                {/* <input value = {content} getName = {handlePost}/>
                <button /> */}
            </div>
        </div>
    )
}