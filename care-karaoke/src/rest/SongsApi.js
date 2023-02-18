const SONGS_ENDPOINT = "https://63c87820075b3f3a91e1846e.mockapi.io/songs"

class SongsApi {
  // Method to fetch songs from the API
  get = async () => {
    try {
      const resp = await fetch(SONGS_ENDPOINT)
      const data = await resp.json()
      return data
    } catch(e) {
      console.log('fetch songs had an issue.', e)
    }
  }

  // Method to update a song on the API
  put = async (song) => {
    try {
      const resp = await fetch(`${SONGS_ENDPOINT}/${song._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      })
      return await resp.json()
    } catch(e) {
      console.log('looks like updating song had an issue', e)
    }
  }

  // Method to delete a song from the API
  delete = async (id) => {
    try {
      const resp = await fetch(`${SONGS_ENDPOINT}/${id}`, {
        method: 'DELETE'
      });
      return await resp.json();
    } catch (e) {
      console.log('looks like deleting song had an issue', e);
    }
  };

  // Method to create a new song on the API
  post = async (song) => {
    try {
      const resp = await fetch(SONGS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      });
      return await resp.json();
    } catch (e) {
      console.log('Looks like creating a new song had an issue', e);
    }
  }
}

// Export an instance of the SongsApi class for use in other modules
export const songsApi = new SongsApi()
