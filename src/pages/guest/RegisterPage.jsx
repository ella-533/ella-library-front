import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();

    const username = event.target.username.value
    const password = event.target.password.value

    const userData = {
        username,
        password
    };
    console.log(userData , '1');

    try {

      const response = await fetch('http://localhost:3005/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const result = await response.json();
        window.alert("Utilisateur créé avec succès !");
        navigate("/login");
      } else {
        setMessage("Une erreur lors de l'inscription , Veuillez réessayer plus tard ");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Une erreur lors de la connexion au serveur');
    }
  };

  return (
    <section>
      {message && <p>{message}</p>}
      <h2>s'inscrire</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username
          <input
            type="text"
            name="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
          />
        </label>
        <input type="submit" value="S'inscrire"/>
      </form>
    </section>
  );
};

export default RegisterPage;
