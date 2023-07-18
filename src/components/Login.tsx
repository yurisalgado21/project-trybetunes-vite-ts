import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { createUser } from '../services/userAPI';

export default function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleNameChange(event: React.ChangeEvent<
  HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.length >= 3) {
      setLoading(true);
      createUser({ name })
        .then(() => {
          setLoading(false);
          navigate('/search');
        }).catch((error) => {
          console.error('Error creating user:', error);
          setLoading(false);
        });
    }
  }

  return (
    <div>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          data-testid="login-name-input"
          type="text"
          name="name"
          value={ name }
          onChange={ handleNameChange }
        />
        <button
          data-testid="login-submit-button"
          disabled={ name.length < 3 }
          type="submit"
        >
          Entrar
        </button>
      </form>
      {loading && <LoadingMessage />}
    </div>
  );
}
