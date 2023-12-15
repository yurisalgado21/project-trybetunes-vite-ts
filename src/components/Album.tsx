import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';

export default function Album() {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null >(null);
  const [musics, setMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);

  const myFavoritesSongs = () => {
    setLoading(false);
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      setLoading(true);
      const [albumData, ...albumMusics] = await getMusics(String(id));
      setAlbumInfo(albumData);
      setMusics(albumMusics);
      setLoading(false);
    };
    fetchAlbum();
  }, [id]);

  return (
    <div>
      {loading && <LoadingMessage />}
      {!loading && albumInfo !== null && (
        <div className="album-specifif">
          <img id="album-specific-foto" src={ albumInfo.artworkUrl100 } alt="" />
          <p id="artist-name-id" data-testid="artist-name">{albumInfo.artistName}</p>
          <p
            id="artist-nameCollection"
            data-testid="album-name"
          >
            {albumInfo.collectionName}

          </p>
          <ul className="music-container">
            {musics.map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  myFavoritesSongs={ () => myFavoritesSongs() }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
