import { PostObj } from "../components/Post"

export type outMessageType = {
    changed: PostObj[],
    added: PostObj[],
    deletedIds: string[]
}

export type outDTO = {
    outMessage : outMessageType,
    prevPosts: PostObj[]
}

