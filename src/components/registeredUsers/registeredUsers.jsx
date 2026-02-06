import { useEffect, useState } from "react"

function RegisteredUsers  () {

    const [users , setUsers] = useState([]);




const fetchRegisteredUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/getRegisteredUsers' , {
            method : 'GET', 
            headers :{
                "content-type" : "application/json"
            },
        });

        const data = res.json()
        if(!res.ok) throw new Error(data.message || 'Failed to fetched registerd users')

            setUsers(data.users)
        
    } catch (error) {

         console.error(error);
      alert(err.message || "Server error");
        
    }
}


useEffect(() => {
    fetchRegisteredUsers()
}, [users])


    return (
        <>

        <h4>regisstered users</h4>

            {
                users.map((u , index) => {
                    return (
                        <>
                        <div className="" key={index}>
                            <p>{u.name}</p>
                        </div>
                        </>
                    )
                })
            }
        
        </>
    )
}

export default RegisteredUsers