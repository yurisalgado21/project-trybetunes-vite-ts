// LoadingMessage.js
import React from 'react';
import imageSpinner from '../../images/🦆 icon _Spinner_.svg';

function LoadingMessage() {
  return (
    <p id="loading-id">
      <img src={ imageSpinner } alt="" />
      Carregando...
    </p>
  );
}

export default LoadingMessage;
