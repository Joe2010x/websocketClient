
import { Author } from './Author';
import { AuthorComponent } from './Author';
import { colorType } from '../services/Color';
import { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export interface PostObj {
    id: string;
    title: string;
    content: string;
    created: Date;
    updated?: Date;
    author: Author;
}

type props = {
    post: PostObj,
    owner: Author | null,
    getDeleteId: (id: string) => void,
    getChangedId: (id: string) => void,
    color: colorType
}

export const Post = ({ post, owner, getDeleteId, getChangedId, color }: props) => {
    const [buttonVisuability, setButtonVisuability] = useState(false);
    const handleDelete = () => {
        getDeleteId(post.id);
    };
    const hangleChanged = () => {
        getChangedId(post.id);
    }
    return (
        <div>
        <div className='post' >
            
            <div className='post-name' style={{backgroundColor:color.c3}}>
                <img className='avatarPost' src={post.author?.avatar} />
                <span>{post.author?.name}</span>
                
            </div>
            <div className='post-content' style={{backgroundColor:color.c3}} onClick = {() => setButtonVisuability(!buttonVisuability)}>
                <p className='post-content-words'>{post.content}</p>
                {owner?.id === post.author.id && buttonVisuability && <AiOutlineDelete className='DelBtn' 
                style = {{backgroundColor:"black", height:"0.6rem", width:"0.6rem"}}
                onClick={handleDelete} />}
                {owner?.id === post.author.id && buttonVisuability && <AiOutlineEdit className='ChangeBtn' 
                style = {{backgroundColor:"black", height:"0.6rem", width:"0.6rem"}}
                onClick={hangleChanged}/>}
            </div>

        </div>
            <span>{post.created.toString()}</span>
        </div>
    )
}


