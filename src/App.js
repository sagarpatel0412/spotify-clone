import React,{useEffect,useState} from 'react';
import Login from './Login';
import './App.css';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  //const [token,setToken] = useState(null);
  const [{user,token}, dispatch] = useDataLayerValue();


  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      dispatch({
        type:"SET_TOKEN",
        token:_token,
      });
      //setToken(_token);
      
      spotify.setAccessToken(_token);
      spotify.getMe().then(user =>{
        console.log("hello",user);
        dispatch({
          type:"SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists)=> {
        dispatch({
          type:"SET_PLAYLIST",
          playlists:playlists,
        });
      });
      spotify.getPlaylist("5O0lR7LiAE5kPqw0XEDKRn").then((response)=>{
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        });
      });
    }

    console.log("i have a token>>>",token);

   
  }, []);
//3:02:12 stopping time
console.log("logout",user);
console.log("hellot",token);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} />:<Login/> }
     
    </div>
  );
}

export default App;
