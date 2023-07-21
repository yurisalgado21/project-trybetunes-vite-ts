import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import LoadingMessage from './LoadingMessage';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [myUser, setUser] = useState<UserType>();

  useEffect(() => {
    const getMyUser = async () => {
      setLoading(true);
      const user = await getUser();
      setUser(user);
      setLoading(false);
    };
    getMyUser();
  });

  return (
    <div>
      Profile
      {loading && <LoadingMessage />}
      {!loading && (
        <ul>
          <li key={ myUser?.name }>
            <div>
              <img data-testid="profile-image" src={ myUser?.image } alt="" />
            </div>
            <Link to="/profile/edit">Editar perfil</Link>
            <p>
              {myUser?.name}
            </p>
            <p>
              {myUser?.email}
            </p>
            <p>
              {myUser?.description}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}
