import React from 'react'
import { songsApi } from '../rest/SongsApi.js'

export class SongsList extends React.Component {
//state - Holds the state of the component, including songs array, newSongTitle string, and newSongGenre string. 
  state = {
    songs: [],
    newSongTitle: '',
    newSongGenre: '',
  }
//componentDidMount() - Called when the component mounts, triggers a call to fetchSongs().
  componentDidMount() {
    this.fetchSongs()
  }
//fetchSongs - Calls the get() method of the songsApi to fetch the songs from the REST API, and sets the songs state with the returned data.
  fetchSongs = async () => {
    const songs = await songsApi.get()
    this.setState({ songs })
  }
//deleteSong - Calls the delete() method of the songsApi to delete the song with the given songId, and then calls fetchSongs() to update the list of songs.
  deleteSong = async (songId) => {
    await songsApi.delete(songId)
    this.fetchSongs()
  }

  updateSong = async (songId, updateSongTitle, updateSongGenre) => {
    await songsApi.update({ title: updateSongTitle, genre: updateSongGenre, id: songId })
    this.setState({ updateSongTitle: '', updateSongGenre: '' })
    this.fetchSongs()
  }
//createSong - Called when the form is submitted, calls the post() method of the songsApi to add a new song with the newSongTitle and newSongGenre states, resets the newSongTitle and newSongGenre states, and then calls fetchSongs() to update the list of songs.
  createSong = async (event) => {
    event.preventDefault()
    const { newSongTitle, newSongGenre } = this.state
    await songsApi.post({ title: newSongTitle, genre: newSongGenre })
    this.setState({ newSongTitle: '', newSongGenre: '' })
    this.fetchSongs()
  }
//handleTitleChange - Called when the title input changes, updates the newSongTitle state with the new value.
  handleTitleChange = (event) => {
    this.setState({ newSongTitle: event.target.value })
  }
//handleGenreChange - Called when the genre input changes, updates the newSongGenre state with the new value.
  handleGenreChange = (event) => {
    this.setState({ newSongGenre: event.target.value })
  }
//render - Renders the list of songs, the form to add new songs, and the delete button for each song.
  render() {
    const { x, y, songs, newSongTitle, newSongGenre } = this.state
    let songItems = null
    if (songs.length > 0) {
      songItems = songs.map((song) => (
        <li key={song.id}>
          <form>
          <label>
            {song.title}
            <input type="text" onChange={this.updateSongTitle}/>
          </label>
          <label>
            {song.genre}
            <input type="text" onChange={this.updateSongGenre} />
            
          </label>
          </form>
          <button onClick={() => this.updateSong(song.id, x, y)}>Update</button>
          <button onClick={() => this.deleteSong(song.id)}>Delete</button>
        </li>
      ))
    }
    return (
      <div className="song-list">
        <form onSubmit={this.createSong}>
          <label>
            Title:
            <input type="text" value={newSongTitle} onChange={this.handleTitleChange} />
          </label>
          <label>
            Genre:
            <input type="text" value={newSongGenre} onChange={this.handleGenreChange} />
          </label>
          <button type="submit">Add Song</button>
        </form>
        <ul>{songItems}</ul>
      </div>
    )
  }
}
