import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myDataUser, setMyDataUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [isDisable, setIsDisable] = useState(false);
  console.log(loading);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleChange(event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) {
    const { name, value } = event.target;
    setMyDataUser({
      ...myDataUser,
      [name]: value,
    });
    validateUser();
  }

  function handleClick() {
    const { name, email, image, description } = myDataUser;
    setLoading(true);
    const updateMyData = async () => {
      await updateUser({
        name, email, image, description,
      });
      setLoading(false);
    };
    updateMyData();
    navigate('/profile');
  }

  function validateUser() {
    const { name, email, description, image } = myDataUser;
    const nameIsValid = name.length > 0;
    const emailIsValid = email.includes('@') && email.includes('.com');
    const descriptionIsValid = description.length > 0;
    const imageIsValid = image.length > 0;

    const formValidYOrN = (
      nameIsValid
        && emailIsValid
        && descriptionIsValid
        && imageIsValid);
    setIsDisable(!formValidYOrN);
  }

  useEffect(() => {
    const getMyDataUser = async () => {
      setLoading(true);
      const myData = await getUser();
      setMyDataUser(myData);
      setLoading(false);
    };
    getMyDataUser();
  }, []);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            name="name"
            defaultValue={ myDataUser.name }
            value={ myDataUser.name }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="email">
          email
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            name="email"
            defaultValue={ myDataUser.email }
            value={ myDataUser.email }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="description">
          description
          <input
            data-testid="edit-input-description"
            type="text"
            id="description"
            name="description"
            defaultValue={ myDataUser.description }
            value={ myDataUser.description }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="image">
          image
          <input
            data-testid="edit-input-image"
            type="text"
            id="image"
            name="image"
            defaultValue={ myDataUser.image }
            value={ myDataUser.image }
            onChange={ handleChange }
            required
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ isDisable }
          onClick={ handleClick }
        >
          Save
        </button>
      </form>
    </div>
  );
}
