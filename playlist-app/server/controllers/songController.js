
const Song = require('../model/Song');

const serveSongs = (req, res) => {
  const songsList = Song.list();
  res.send(songsList);
}

const serveSong = (req, res) => {
  const { id } = req.params;
  const song = Song.find(Number(id));
  if (!song) return res.status(404).send(`No song with the id ${id}`);
  res.send(song);
};

const createSong = (req, res) => {
  const { title, artist } = req.body;
  const newSong = new Song(title, artist);
  res.send(newSong);
};

const updateSong = (req, res) => {
  const { title, artist } = req.body;
  const { id } = req.params;
  const updatedSong = Song.editDetails(Number(id), title, artist);
  if (!updatedSong) return res.sendStatus(404);
  res.send(updatedSong);
}

const deleteSong = (req, res) => {
  const { id } = req.params;
  const didDelete = Song.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong
};
