import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useLocalStorage } from "usehooks-ts";


const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loginUser,setUser]= useLocalStorage('user',{})

  useEffect(() => {
    // Pour récupérer les données de l'API
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch("http://localhost:3005/api/users",{
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`http://localhost:3005/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }
      
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(`Error deleting user: ${err.message}`);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <h1>Liste des utilisateurs :</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users ? (
        <>  
          {users.map((user) => (
            <article key={user.id}>
              <h2>{user.username}</h2>
              {loginUser.role === 1 && ( // Afficher le bouton supprimer seulement pour les super admin
             
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              )}
            </article>
          ))}
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </>
  );
};

export default UsersPage;

