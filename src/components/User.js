import {useState} from 'react'

const User = ({name, location}) =>{
  const [count] = useState(0);

  return(
    <>
    <div className="user-card">
     <h3>Count: {count}</h3>
     <h3>Name : {name} </h3>
     <h3>Location: {location}</h3>
     <h3>email: vinaypalmoori463@gmail.com</h3>
    </div>
    </>
  )
};

export default User;