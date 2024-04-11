//song.js

const getId = require('../utils/getId');

class Song {
  static #all = [];

  constructor(title, artist) {
    this.id = getId();
    this.title = title;
    this.artist = artist;

    Song.#all.push(this);
  }

  static list() {
    return Song.#all;
  }

  static find(id) {
    return Song.#all.find((song) => song.id === id);
  }

  static editDetails(id, newTitle, newArtist) {
    const song = Song.find(id);
    if (!song) return null;
    song.title = newTitle;
    song.artist = newArtist;
    return song;
  }

  static delete(id) {
    const songIndex = Song.#all.findIndex((song) => song.id === id);
    if (songIndex < 0) return null;

    Song.#all.splice(songIndex, 1);
    return true;
  }
}

module.exports = Song;
