// Home.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newlyAddedSong, setNewlyAddedSong] = useState({})

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const [data, error] = await fetchData('/api/songs/')
        if (data) setSongs(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSongs();
  }, [newlyAddedSong])

  const createSong = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title: newSongTitle, artist: newSongArtist })
      }
      const [data, error] = await fetchData(`/api/songs/`, options)
      if (data) setNewlyAddedSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongTitle('');
    setNewSongArtist('');
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={createSong}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} />
        <label htmlFor="artist">Artist</label>
        <input type="text" name="artist" id="artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} />
        <button type="submit">Add Song</button>
      </form>
      <ul>
        {
          songs.map((song) => {
            return <li key={song.id}>
              <Link to={`/songs/${song.id}`}>
                {song.title} - {song.artist}
              </Link>
            </li>
          })
        }
      </ul >
    </>
  )
}

export default Home;
