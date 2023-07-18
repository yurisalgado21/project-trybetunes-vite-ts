import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from './LoadingMessage';
import { AlbumType } from '../types';

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
    <div>
      <label htmlFor="artist">Digite o nome da banda ou artista:</label>
      <form>
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
          <p>
            Resultado de álbuns de:
            {' '}
            {inputName}
          </p>
          <ul>
            {albums.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
            ))}
          </ul>
        </>
      )}
      {!loading && albums.length === 0 && inputName.length >= 2 && (
        <p>Nenhum álbum foi encontrado</p>
      )}
    </div>
  );
}
