import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from './LoadingMessage';
import { AlbumType } from '../types';
import imageNotFound from '../../images/🦆 icon _circle error_.svg';

export default function Search() {
  const [nameArtist, setNameArtist] = useState('');
  const [inputName, setNameInput] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [loading, setLoading] = useState(false);

  function handleNameArtistChange(event: React.ChangeEvent<
  HTMLInputElement>) {
    setNameArtist(event.target.value);
  }

  async function handleSearch() {
    if (nameArtist.length >= 2) {
      setLoading(true);
      const albumsData = await searchAlbumsAPI(nameArtist);
      setAlbums(albumsData);
      setLoading(false);
      setNameInput(nameArtist);
      setNameArtist('');
    }
  }

  useEffect(() => {
    setAlbums([]);
  }, []);

  return (
    <div id="id-search-form">
      <label id="id-label" htmlFor="artist">Digite o nome da banda ou artista:</label>
      <form id="form-search">
        <input
          type="text"
          id="artist"
          data-testid="search-artist-input"
          value={ nameArtist }
          placeholder="Nome do Artista"
          onChange={ handleNameArtistChange }
        />
        <button
          type="button"
          id="button-search"
          data-testid="search-artist-button"
          disabled={ nameArtist.length < 2 }
          onClick={ handleSearch }
        >
          Pesquisar
        </button>
      </form>
      {loading && <LoadingMessage />}
      {!loading && albums.length > 0 && (
        <>
          <p id="nome-id-resultado">
            Resultado de álbuns de:
            {' '}
            {inputName}
          </p>
          <ul id="albums-container">
            {albums.map((album) => (
              <li id="album" key={ album.collectionId }>
                <Link
                  id="album-capa"
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <img id="image-album" src={ album.artworkUrl100 } alt="" />
                  <p id="name-album">{album.collectionName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {!loading && albums.length === 0 && inputName.length >= 2 && (
        <p id="id-not-search">
          <div>
            <img src={ imageNotFound } alt="" />
          </div>
          Nenhum álbum foi encontrado
        </p>
      )}
    </div>
  );
}
