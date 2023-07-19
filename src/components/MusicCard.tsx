import React from 'react';
import { SongType } from '../types';

export default function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}
