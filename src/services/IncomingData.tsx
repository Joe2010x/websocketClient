import { PostObj } from "../components/Post";
import { outMessageType } from "./SomeTypes";
import { outDTO } from "./SomeTypes";

export const ProcessIncomingData = (incomingData: string, oldPosts : PostObj[]) => {

    var {outMessage, prevPosts} : outDTO = JSON.parse(incomingData);

    const CombinePosts = (posts: PostObj[], newEntry : PostObj) => {
        console.log("inside combined Posts",posts, "new entry ",newEntry);
        let filteredPosts = posts.filter(p => p.id === newEntry.id);
        console.log("filter result", filteredPosts);
        if (posts.length === 0) return posts.concat(newEntry);
        else if (filteredPosts.length !== 0) {
            console.log("no new entry");
            return posts;
        }
        else return posts.concat(newEntry);
    }

    var newPosts: PostObj[] = [];
   
    console.log("incoming data ",outMessage,prevPosts);
    console.log("length add, ",outMessage.added.length);
    console.log("length changed, ",outMessage.changed.length);
    console.log("length deleted, ",outMessage.deletedIds.length);

        if (outMessage.added.length !== 0) {
            var newAddedPosts: PostObj = outMessage.added[0];
            console.log("add",newAddedPosts);
            // if (prevPosts.length !== 0) return CombinePosts(prevPosts, outMessage.added[0]);
            // else 
            
            return CombinePosts(oldPosts,outMessage.added[0]);
        } else if (outMessage.deletedIds.length !== 0) {

            var posts = oldPosts.filter(p => !outMessage.deletedIds.includes(p.id));
            console.log("after Delete", posts);
            console.log("deltetIds",outMessage,"newPosts", posts);
            return posts;
        } else if (outMessage.changed.length !== 0) {
            var changedPost = outMessage.changed[0];
            oldPosts.forEach(p => {
                    // var result = outMessage.changed.filter(o => o.id === p.id)
                    // newPosts.push(result.length === 0 ? p : result[0] );
                    if (p.id === changedPost.id ) newPosts.push(changedPost);
                    else newPosts.push(p);
                })
        }
    // 3.2 change posts
        // var newPosts: PostObj[] = [];
        // newAddedPosts.forEach(p => {
        //     var result = outMessage.changed.filter(o => o.id === p.id)
        //     newPosts.push(result.length === 0 ? p : result[0] );
        // })
    // 3.3 delete posts
    // 3.4 set new posts
        
    //setPosts((prev) => prev.concat(JSON.parse(lastMessage.data)));
    return newPosts;
}