import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

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
    <header data-testid="header-component">
      {loading && <LoadingMessage />}
      <span data-testid="header-user-name">{nameUser}</span>
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      </nav>
      <nav>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      </nav>
      <nav>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      </nav>
    </header>
  );
}
