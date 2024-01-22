import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";

function EachUser(){
    const [user , setUser]= useState(null);
    
    const { id } = useParams();

    useEffect(() => {
      (async () => {
        try {
          const userRes = await fetch(`http://localhost:3005/api/users/${id}`);
          const userResData = await userRes.json();
          setUser(userResData);
        } catch (error) {
          console.error("Error fetching user:", error);
          // Handle errors, e.g., setuser(null) or show an error message
        }
      })();
    }, [id]);

    const handleDeleteUser = async()=>{
        const token = localStorage.getItem('jwt')
    const adminConfirm = window.confirm(`are you sure that you wanna delete this user ( ${user.data.username} ) ?`)
    if(adminConfirm){

      try {
        const response = await fetch(`http://localhost:3005/api/users/${user.data.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
            alert('user is deleted!')
        } else {
          console.error('Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error occurred during delete deletion:', error);
      }

    }


    }
        
    return (
        <>
        <Header />
        <main>
            <p>{user ? user.data.username : <></>}</p>
            <button onClick={handleDeleteUser}>delete</button>
        </main>
        </>
    )
}
export default EachUser;