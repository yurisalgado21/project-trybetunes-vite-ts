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
        <>
          <img src={ albumInfo.artworkUrl100 } alt="" />
          <p data-testid="artist-name">{albumInfo.artistName}</p>
          <p data-testid="album-name">{albumInfo.collectionName}</p>
          <ul>
            {musics.map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
