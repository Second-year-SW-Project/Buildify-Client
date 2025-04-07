import React, { useEffect, useState } from 'react'
import axios from "axios"

import Test3 from './Test3';

const URL = "http://localhost:5000/users";

const fetchHandler = async () =>{

  return await axios.get(URL).then((res) => res.data);
}


export default function Tad2() {
  const [users,setUsers] = useState();
  useEffect(()=>{
    fetchHandler().then((data) =>setUsers(data.users));
  },[])




  return (
    <div>
      
      
      <div>
        {users && users.map((user,i) =>(
          <div key={i}>
            <Test3 user={user}/>
          </div>
        ))}


        
      </div>
      
    
    
    </div>
  )
}
