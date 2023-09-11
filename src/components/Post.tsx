
import { Author } from './Author';
import { AuthorComponent } from './Author';
import { color } from '../services/Color';

export interface PostObj {
    id: string;
    title: string;
    content: string;
    created: Date;
    updated?: Date;
    author: Author;
}

type props = {
    post : PostObj,
    getDeleteId : (id:string) => void,
    getChangedId : (id:string) => void
}

export const Post = ({ post, getDeleteId, getChangedId }: props) => {
    const handleDelete = () =>{
        getDeleteId (post.id);
    };
    const hangleChanged = () =>{
        getChangedId (post.id);
    }
    return (
        <div className='post' style={{backgroundColor: color.c5}}>
            <div className='post-name'>
                <img className='avatarPost' src={post.author?.avatar} />
                <span>{post.author?.name}</span>
                <button className='DelBtn' onClick={handleDelete}>Delete</button>
                <button className='DelBtn' onClick={hangleChanged}>change</button>

            </div>
            <div className='post-content'>
                <h2>{post.title ?? ""}</h2>
                <p>{post.content}</p>
                <span>{post.created.toString()}</span>
            </div>
        </div>
    )
}


