import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import './LoginPage.scss'
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "usehooks-ts";
const LoginPage = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
 const [user,setUser]= useLocalStorage('user',{})

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const loginData = {
      username,
      password,
    };

    const loginDataJson = JSON.stringify(loginData);

    const loginResponse = await fetch("http://localhost:3005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });

    const loginResponseData = await loginResponse.json();
    const token = loginResponseData.data;
    setUser(loginResponseData)
    
    if (token) {
      localStorage.setItem("jwt", token);

      const decodedToken = jwtDecode(token);
console.log(decodedToken)
      if (decodedToken.data.role !== 3) {
          setMessage("Vous êtes bien connecté en tant qu'admin");
          navigate("/admin");
      } else {
          setMessage("Vous êtes bien connecté");
          navigate("/");
      }
    }
};

  return (
    <section>
      {message && <p>{message}</p>}
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <label>
          Nom d'utilisateur
          <input type="text" name="username" />
        </label>
        <label>
          Mot de passe
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Se connecter" />
      </form>

      <Link to={`/register`}> S'inscrir</Link>

    </section>
  );
};


export default LoginPage;

