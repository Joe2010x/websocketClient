import React, { useEffect, useCallback, useRef, useState } from 'react';
import logo from './logo.svg';
import logoCat from './logoCat.png';
import './App.css';
import { PostObj, Post } from './components/Post';
//import { posts } from './Seed';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { LandingPage } from './components/LandingPage';
import { Author } from './components/Author';
import { colors, colorType } from './services/Color';
import { EmptyPage } from './pages/EmptyPage';
import { EditorBlock } from './components/EditorBlock';
import { outDTO, outMessageType } from './services/SomeTypes';
import { ProcessIncomingData } from './services/IncomingData';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages/ErrorPage';

function App() {
  const [status, setStatus] = useState<string>("Landing");
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [socketUrl, setSocketUrl] = useState<string>('ws://127.0.0.1:5501/EchoAll');
  const [author, setAuthor] = useState<Author | null>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [color, setColor] = useState<colorType>(colors[Math.floor(Math.random() * colors.length)]);
  const [changedPost, setChangedPost] = useState<PostObj | null> (null);

  // const [outMessage, setOutMessage] = useState<outMessageType>({ changed: [], added: [], deletedIds: [] });

  const getAuthor = (author: Author) => { setAuthor(author); }
  const getDeleteId = (id: string) => {
    // console.log("delete  ", id);
    sendMessage(JSON.stringify({ outMessage: { changed: [], added: [], deletedIds: [id] }, prevPosts: posts }));
  }

  const getChangedId = (id: string) => {
    // console.log("changed id ", id);
    // console.log("find changed post, ",posts.find(p => p.id === id) );
    setChangedPost(posts.find(p => p.id === id) ?? null);
    // setOutMessage((prev) => {
    //   return {
    //     changed: prev.changed,
    //     added: prev.added,
    //     deletedIds: prev.deletedIds.concat(id)
    //   }
    // });
    // sendMessage(JSON.stringify({ outMessage: { changed: [], added: [], deletedIds: [] }, prevPosts: posts }));
  }

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    console.log("Trigger receing message ",lastMessage);
    if (lastMessage !== null && lastMessage.data !== null) {
      setPosts(ProcessIncomingData(lastMessage.data, posts));
    }
  }, [lastMessage]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [posts])

  // messageEndRef.current.value = "";

  const getPost = (newPost: PostObj) => {
    console.log(newPost);
    sendMessage(JSON.stringify({ outMessage: { changed: [], added: [newPost], deletedIds: [] }, prevPosts: posts }));
  }

  const getChangedPost = (newPost: PostObj) => {
    console.log(newPost);
    sendMessage(JSON.stringify({ outMessage: { changed: [newPost], added: [], deletedIds: [] }, prevPosts: posts }));
  }

  // const handleClickSendMessage = 
  //   useCallback(
  //   () => {
  //   sendMessage(JSON.stringify({outMessage:outMessage,prevPosts:posts}));
  //   setOutMessage({changed:[] ,added:[] , deletedIds:[]});
  //   }
  //   , [outMessage]);

  // console.log("color ", Math.floor(Math.random() * colors.length));
  // console.log("Colors, ", colors);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className="App" >

      <div className='body'>
        {status === "Landing" && <LandingPage
          setStatus={setStatus}
          getAuthor={getAuthor}
          logo={logoCat}
          color={color} />}
        {status == "Content" &&
          <div>
            <p>WebSocket is {connectionStatus}</p>
            <div className='Posts' style={{ backgroundColor: color.c3 }}>
              {
                posts.length == 0 ?
                  < EmptyPage /> : posts.map((p, index) =>
                    <Post key={index} post={p} getDeleteId={getDeleteId} getChangedId = {getChangedId}/>)
              }
              <div className='messageEndRef' ref={messageEndRef} />
            </div>
            {/* <button className='barButton-confirm'
              onClick={handleClickSendMessage}
              disabled={readyState !== ReadyState.OPEN}>
              Confirm Updates
            </button> */}
            <EditorBlock
              author={author}
              //getNewPost = {getNewPost} 
              changedPost = {changedPost}
              getPost={getPost} 
              getChangedPost = {getChangedPost}
              />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
