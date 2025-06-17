import React from 'react';

class UserClass extends React.Component{
 
  // to pass and define state variable we use consturtor
  constructor(props){
    super(props)
    console.log('child constructor')
    // state is big object where we create state varaible using this.state
     this.state = {
         userInfo: {
          name:"dummy_name",
          email:"dummy@gmail.com"
         }
     }
  }

  async componentDidMount(){
     const data = await fetch('https://api.github.com/users/VeenaBiral')
     const json = await data.json()
     console.log(json)

     this.setState({
        userInfo: json,
     })
     console.log('child component did mount')
  }

  render(){
    console.log('child render')
    let {name , location, avatar_url, company} = this.state.userInfo

    return(
     <div className="user-card">
         <h3>Name : {name} </h3>
        <h3>Location: {location}</h3>
        <h3>company:{company}</h3>
        {/* // do not update state variable directly  this.state.count = this.state.count + 1
        // whenever the state variable is updated it re-renders */}
       
    </div>
    )
  
  }
};

export default UserClass;