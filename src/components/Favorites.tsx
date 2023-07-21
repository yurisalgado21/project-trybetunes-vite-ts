import React, { useEffect, useState } from 'react';
import { SongType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import LoadingMessage from './LoadingMessage';

export default function Favorites() {
  const [loading, setLoading] = useState(false);
  const [myMusics, setMyMusics] = useState<SongType[]>([]);

  useEffect(() => {
    const getMyMusics = async () => {
      setLoading(true);
      const myListFetch = await getFavoriteSongs();
      setMyMusics(myListFetch);
      setLoading(false);
    };
    getMyMusics();
  }, []);

  function myFavoritesSongs(trackId: number) {
    setMyMusics((prevFavorite) => prevFavorite
      .filter((song) => song.trackId !== trackId));
  }

  return (
    <div>
      Favorites
      {loading && <LoadingMessage />}
      {!loading && myMusics !== null && (
        <ul>
          {myMusics?.map((music) => (
            <li key={ music.trackId }>
              <MusicCard
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                myFavoritesSongs={ () => myFavoritesSongs(music.trackId) }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
