import React,{useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


const App =()=>{
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1,
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 11,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 22,
    },
    {
      name: "Example Playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 33,
    },
  ]);
  const addTrack=(track)=>{
    const trackFound= playlistTracks.find((playlistTrack)=>playlistTrack.id===track.id);
    if(!trackFound){
      setPlaylistTracks((prev)=> [track, ...prev]);
    }
  }
  const removeTrack =(track)=>{
    const isPresent=playlistTracks.filter((playlistTrack)=>playlistTrack.id!==track.id);
    setPlaylistTracks(isPresent);
  }
  const updatePlaylistName=(name)=>setPlaylistName(name);
  const savePlaylist = ()=>{
    const trackURIs=playlistTracks.map((track)=>track.uri);
    const name = playlistName;
    Spotify.savePlaylistName(name,trackURIs).then(()=>{
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });

  }
  const search =(term)=>{
    Spotify.search(term)
    .then((results)=>setSearchResults(results));
    console.log(term);}
    return (
      <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search}  />
        
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />

        </div>
      </div>
    </div>
      );
  
}

export default App;
