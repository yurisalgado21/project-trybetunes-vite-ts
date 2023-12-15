import React, { useEffect, useState } from 'react';
import { SongType } from '../types';
import imageCheckedHeart from '../images/checked_heart.png';
import emptyImage from '../images/empty_heart.png';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default function MusicCard(track:
SongType & { myFavoritesSongs: () => void }) {
  const { trackName, previewUrl, trackId, myFavoritesSongs } = track;
  const [checked, setChecked] = useState(false);
  const [favoriteMusic, setFavoriteMusic] = useState(false);
  const [listMyFavoritesMusics, setListMyFavoritesMusics] = useState<SongType[]>();
  const [loading, setLoading] = useState(false);

  console.log(listMyFavoritesMusics);
  console.log(loading);

  async function isFavoriteMusic(prop: boolean) {
    setFavoriteMusic(prop);
    if (!favoriteMusic) {
      await addSong({ trackId, trackName, previewUrl });
    }
  }

  async function notFavoriteMusic(prop: boolean) {
    setFavoriteMusic(prop);
    if (favoriteMusic) {
      await removeSong({ trackId, trackName, previewUrl });
    }
  }

  function handleChecked() {
    if (!checked) {
      setChecked(true);
      isFavoriteMusic(true);
      myFavoritesSongs();
    } else {
      setChecked(false);
      notFavoriteMusic(false);
      myFavoritesSongs();
    }
  }

  useEffect(() => {
    const fetchGetFavoriteSongs = async () => {
      setLoading(true);
      const myFavoritesMusics = await getFavoriteSongs();
      myFavoritesMusics.filter((mySongs) => mySongs.trackId
      === trackId && setChecked(true));
      setListMyFavoritesMusics(myFavoritesMusics);
      setLoading(false);
    };
    fetchGetFavoriteSongs();
  }, [trackId]);

  return (
    <div className="track-class">
      <div className="container-music-favorite">
        <p id="track-name">{trackName}</p>
        <audio id="audio-music" data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label id="checkbox-heart" data-testid={ `checkbox-music-${trackId}` }>
          {checked ? <img src={ imageCheckedHeart } alt="favorite" />
            : <img src={ emptyImage } alt="favorite" />}
          <input
            id="checkbox-heart"
            type="checkbox"
            onChange={ handleChecked }
            checked={ checked }
            style={ { appearance: 'none' } }
          />

        </label>
      </div>
    </div>
  );
}
