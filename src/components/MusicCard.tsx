import React, { useState } from 'react';
import { SongType } from '../types';
import imageCheckedHeart from '../images/checked_heart.png';
import emptyImage from '../images/empty_heart.png';

export default function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [checked, setChecked] = useState(false);

  function handleChecked() {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

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
      <label data-testid={ `checkbox-music-${trackId}` }>
        {checked ? <img src={ imageCheckedHeart } alt="favorite" />
          : <img src={ emptyImage } alt="favorite" />}
        <input
          type="checkbox"
          onChange={ handleChecked }
          checked={ checked }
        />
      </label>
    </div>
  );
}
