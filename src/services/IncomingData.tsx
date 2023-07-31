import { PostObj } from "../components/Post";
import { outMessageType } from "./SomeTypes";
import { outDTO } from "./SomeTypes";

export const ProcessIncomingData = (incomingData: string, oldPosts : PostObj[]) => {

    var {outMessage, prevPosts} : outDTO = JSON.parse(incomingData);
   
    console.log(outMessage,prevPosts);
        var newAddedPosts: PostObj[] = prevPosts.length !== 0 ? prevPosts.concat(outMessage.added) 
        : oldPosts.concat(outMessage.added);
        
        //console.log("newAddedposts",newAddedPosts);
    // 3.2 change posts
        var newPosts: PostObj[] = [];
        newAddedPosts.forEach(p => {
            var result = outMessage.changed.filter(o => o.id === p.id)
            newPosts.push(result.length === 0 ? p : result[0] );
        })
        console.log("deltetIds",outMessage.deletedIds,"newPosts", newPosts);
    // 3.3 delete posts
        var posts = newPosts.filter(p => !outMessage.deletedIds.includes(p.id));
        console.log("after Delete", posts);
    // 3.4 set new posts
        
    //setPosts((prev) => prev.concat(JSON.parse(lastMessage.data)));
    return posts;
}