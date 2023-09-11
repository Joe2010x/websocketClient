import { PostObj } from "../components/Post"
import { outDTO } from "./SomeTypes";

export const ProcessIncomingData = (incomingData: string, oldPosts : PostObj[]) => {

    let {outMessage, prevPosts} : outDTO = JSON.parse(incomingData);

    const CombinePosts = (posts: PostObj[], newEntry : PostObj) => {
        let filteredPosts = posts.filter(p => p.id === newEntry.id);
        if (posts.length === 0) return posts.concat(newEntry);
        else if (filteredPosts.length !== 0) 
            return posts;
        else return posts.concat(newEntry);
    }

    let newPosts: PostObj[] = [];

        if (outMessage.added.length !== 0) 
            return CombinePosts(oldPosts, outMessage.added[0]);
        else if (outMessage.deletedIds.length !== 0) {
            let posts = oldPosts.filter(p => !outMessage.deletedIds.includes(p.id))
            return posts;
        } else if (outMessage.changed.length !== 0) {
            let changedPost = outMessage.changed[0];
            oldPosts.forEach(p => {
                    if (p.id === changedPost.id ) newPosts.push(changedPost);
                    else newPosts.push(p);
                })
        }
    return newPosts;
}