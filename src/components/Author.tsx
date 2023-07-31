
export interface Author {
    name: string;
    avatar?: string;
}

type propsType = {
    author: Author
}

export const AuthorComponent = ({author}: propsType) =>{
    return (
        <div>
             <img className='avatar' src={author?.avatar} />
                <span>{author?.name}</span>
        </div>
    )
}