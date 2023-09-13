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
import Header from './pages/Header';
import Footer from './pages/Footer';

function App() {
  const [status, setStatus] = useState<string>("Landing");
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [socketUrl, setSocketUrl] = useState<string>('ws://127.0.0.1:5501/EchoAll');
  const [author, setAuthor] = useState<Author | null>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [color, setColor] = useState<colorType>(colors[Math.floor(Math.random() * colors.length)]);
  const [changedPost, setChangedPost] = useState<PostObj | null> (null);
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
  
  const getAuthor = (author: Author) => { setAuthor(author) };
  const getDeleteId = (id: string) => sendMessage(JSON.stringify({ outMessage: { changed: [], added: [], deletedIds: [id] }, prevPosts: posts }));
  const getChangedId = (id: string) => setChangedPost(posts.find(p => p.id === id) ?? null);
  const getPost = (newPost: PostObj) => sendMessage(JSON.stringify({ outMessage: { changed: [], added: [newPost], deletedIds: [] }, prevPosts: posts }));
  const getChangedPost = (newPost: PostObj) => {
    sendMessage(JSON.stringify({ outMessage: { changed: [newPost], added: [], deletedIds: [] }, prevPosts: posts }));
    setChangedPost(null);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className="App" >
      <Header />
      <div data-testid='colorBar' style={{display: "flex", flexDirection:"row", overflow:"auto"}}>

        <div style={{backgroundColor:"lightgray", padding:"1rem"}} onClick = {() => setColor((colors[Math.floor(Math.random() * colors.length)]))} ></div>
        {colors.map( (c, index) => 
        <div key= {index} style={{backgroundColor:c.c1, padding:"1rem"}} onClick = {() => setColor(c)} ></div>
        )}
      </div>
      <div className='body'>
        {status === "Landing" && <LandingPage
          setStatus={setStatus}
          getAuthor={getAuthor}
          logo={logoCat}
          color={color} />}
        {status == "Content" &&
          <div className='main' style={{backgroundColor: color.c1, margin:" 0 1rem", paddingBottom:"0.1rem", borderRadius:"1rem"}}>
            <div className='infoWS'>Chat channel is {connectionStatus}</div>
            <div className='Posts' style={{ backgroundColor: color.c2 }}>
              {
                (posts.length === 0) ?
                  < EmptyPage /> : posts.map((p, index) =>
                    <Post key={index} owner={author} post={p} getDeleteId={getDeleteId} getChangedId = {getChangedId} color={color}/>)
              }
              <div className='messageEndRef' ref={messageEndRef} />
            </div>
            <EditorBlock
              author={author}
              changedPost = {changedPost}
              getPost={getPost} 
              getChangedPost = {getChangedPost}
              color = {color}
              />
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
