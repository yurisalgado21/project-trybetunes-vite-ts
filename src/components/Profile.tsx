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
    <div className="div-profile">
      Profile User:
      <div>
        <h4>{myUser?.name}</h4>
        <p>{myUser?.email}</p>
        <p>{myUser?.description}</p>
        <div>
          <img
            id="my-image-profile"
            src={ myUser?.image }
            alt=""
            data-testid="profile-image"
          />
        </div>
        <Link to="/profile/edit" id="editar-perfil-id">Editar perfil</Link>
      </div>
    </div>
  );
}
