import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

function AllUsers(){
    const [users , setAllUsers] = useState([]);

    useEffect(()=>{
        (async()=>{
            const usersRes = await fetch("http://localhost:3005/api/users")

            const usersDataRes = await usersRes.json();

            setAllUsers(usersDataRes)
        })();
    },[])
    console.log(users)
    return (
        <>
        <Header />
        <div className="allUsers">
            {users.map((user)=>{
          return(
            <Link to={`/Admin/User/${user.id}`}>
            <div>
                <p>{user.username}</p>
                <p>{user.createdAt}</p>
            </div>
            </Link>
          );
        })}
            </div>
        </>
    )
}
export default AllUsers;