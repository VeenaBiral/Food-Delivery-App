import UserClass from './UserClass'
import React from 'react'

class About extends React.Component{

  constructor(props){
    super(props)

    console.log('parent constructor')
  }

  render(){
    console.log('parent render')
    return(
      <>
       <h1> This is About page </h1>
       <UserClass />
      </>
    )
  }
};

export default About;