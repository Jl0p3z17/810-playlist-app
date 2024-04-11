// FellowDetails.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const FellowDetails = () => {
  const [song, setSong] = useState({})
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`)
        if (data) setSong(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSong();
  }, [])

  const deleteSong = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const updateSongDetails = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title: newSongTitle, artist: newSongArtist })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
    setNewSongTitle('');
    setNewSongArtist('');
  }

  return (
    <>
      <h1>Song Details</h1>
      <p>{song.title} - {song.artist}</p>
      <button onClick={deleteSong}>Delete Song</button>
      <form onSubmit={updateSongDetails}>
        <label htmlFor="title">Update Title</label>
        <input type="text" name="title" id="title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} />
        <label htmlFor="artist">Update Artist</label>
        <input type="text" name="artist" id="artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default FellowDetails;
