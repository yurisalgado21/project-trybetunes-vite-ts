import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { createUser } from '../services/userAPI';
import imageLogoTrybeTunes from '../../images/logo.svg';

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
    <div id="input-button-Login">
      <div>
        <img src={ imageLogoTrybeTunes } alt="" />
      </div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">Login:</label>
        <input
          id="name"
          data-testid="login-name-input"
          type="text"
          name="name"
          value={ name }
          onChange={ handleNameChange }
          placeholder="Qual é o Seu Nome?"
        />
        <button
          id="button-Login"
          data-testid="login-submit-button"
          disabled={ name.length < 3 }
          type="submit"
        >
          Entrar
        </button>
        {loading && <LoadingMessage />}
      </form>
    </div>
  );
}
