import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';
import imageLogoTrybeTunes from '../../images/logo.svg';
import imageSearch from '../../images/Vector.svg';
import imageStar from '../../images/🦆 icon _star empty_.svg';
import imageProfile from '../../images/🦆 icon _profile_.svg';

export default function Header() {
  const [nameUser, setNameUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const user = await getUser();
      setNameUser(user.name);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <header id="header-id" data-testid="header-component">
      {loading && <LoadingMessage />}
      <img src={ imageLogoTrybeTunes } alt="" />
      <span data-testid="header-user-name" id="nameUser-id">{nameUser}</span>
      <nav>
        <img src={ imageSearch } alt="" />
        <NavLink to="/search" data-testid="link-to-search" id="search-id">Search</NavLink>
      </nav>
      <nav>
        <img src={ imageStar } alt="" />
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          id="favorites-id"
        >
          Favorites

        </NavLink>
      </nav>
      <nav>
        <img src={ imageProfile } alt="" />
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          id="profile-id"
        >
          Profile

        </NavLink>
      </nav>
    </header>
  );
}
