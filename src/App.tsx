import React, { useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { PostObj, Post } from './components/Post';
//import { posts } from './Seed';
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { LandingPage } from './components/LandingPage';
import { Author } from './components/Author';
import { color } from './services/Color';
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
  const [author, setAuthor] = useState<Author | null> (null);
  
  const [outMessage, setOutMessage] = useState<outMessageType>({changed:[] ,added:[] , deletedIds:[]});

  const getAuthor = (author: Author) => { setAuthor(author);}
  const getNewPost = (post : PostObj) => {
     setOutMessage ((prev) => {
            return {
            changed: prev.changed,
            added: [...prev.added, post],
            deletedIds : prev.deletedIds
        }});
  }
  const getDeleteId = (id:string) => {
    console.log("delete id ",id);
    setOutMessage ((prev) => {
      return {
      changed: prev.changed,
      added: prev.added,
      deletedIds : prev.deletedIds.concat(id)
  }});
  } 

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null && lastMessage.data !== null) {
      setPosts(ProcessIncomingData(lastMessage.data,posts));
      setOutMessage({changed:[] ,added:[] , deletedIds:[]});
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({outMessage:outMessage,prevPosts:posts})), [outMessage]);

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
        {status === "Landing" && <LandingPage setStatus={setStatus} getAuthor={getAuthor} />}
        {status == "Content" &&
          <div>
            <p>WebSocket is {connectionStatus}</p>
            <div className='Posts' style={{backgroundColor: color.c3}}>
            {
              posts.length == 0 ?
              < EmptyPage/> : posts.map((p, index) => <Post key={index} post={p} getDeleteId={getDeleteId}/>)
            }
            </div>
            <button className='barButton-confirm'
              onClick={handleClickSendMessage}
              disabled={readyState !== ReadyState.OPEN}>
              Confirm Updates
            </button>
            <EditorBlock author = {author} getNewPost = {getNewPost}/>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
