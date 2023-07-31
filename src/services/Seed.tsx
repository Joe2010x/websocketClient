import { randomUUID } from "crypto";
import { PostObj } from "../components/Post"
import {v4 as uuidv4} from 'uuid';

const post1 : PostObj = {
  id: uuidv4(),
    created : new Date() ,
    title : "new Post",
    content : "It is a new chapter.",
    author : {
      name : "Jackson",
      avatar: "https://api.multiavatar.com/Elisa.svg"
    }
  }

const post2 : PostObj = {
    id:uuidv4(),
    created : new Date() ,
    title : "new Post 2",
    content : "It is a new chapter 2.",
    author : {
      name : "Jackson",
      avatar: "https://api.multiavatar.com/anna.svg"
    }
}

export const posts : PostObj[] = [post1, post2];