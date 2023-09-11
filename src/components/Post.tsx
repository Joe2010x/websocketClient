
import { Author } from './Author';
import { AuthorComponent } from './Author';
import { color } from '../services/Color';
import { useState } from 'react';

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
    getChangedId: (id: string) => void
}

export const Post = ({ post, owner, getDeleteId, getChangedId }: props) => {
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
            
            <div className='post-name' style={{backgroundColor:color.c4}}>
                <img className='avatarPost' src={post.author?.avatar} />
                <span>{post.author?.name}</span>
                
            </div>
            <div className='post-content' style={{backgroundColor:color.c4}} onClick = {() => setButtonVisuability(!buttonVisuability)}>
                {/* <h2>{post.title ?? ""}</h2> */}
                <p className='post-content-words'>{post.content}</p>
                {owner?.id === post.author.id && buttonVisuability && <button className='DelBtn' onClick={handleDelete}>x</button>}
                {owner?.id === post.author.id && buttonVisuability && <button className='ChangeBtn' onClick={hangleChanged}>change</button>}
            </div>

        </div>
            <span>{post.created.toString()}</span>
        </div>
    )
}


