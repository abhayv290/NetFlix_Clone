// eslint-disable-next-line no-unused-vars
import React from 'react'
import styled from 'styled-components'
import {useState, useEffect} from 'react';

import Background from '../Components/Background'
import {firebaseAuth} from '../utils/firebase_config'
import Header from '../Components/Header';
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
export default function Signup(props) {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState(
    {
      email: "",
      password: ""
    }
  )
  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.name]: e.target.value})
  }
  const handleSignin = async () => {
    console.log(formdata);
    const {email, password} = formdata;
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate('/');
    })
  }, [])



  return (
    <Container >

      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login Here</h3>
              <div className="container flex column">
                <input onChange={handleChange} name='email' value={formdata.email} placeholder='email-address' type="email" />
                <input onChange={handleChange} type="password" value={formdata.password} name='password' placeholder='password' />
              </div>
            </div>
            <button onClick={handleSignin} className='btn-sign'>Login</button>
          </div>
        </div>
      </div>
    </Container>




  )
}

const Container = styled.div` 
position :relative;
.content{
 position:absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  .form-container{
    .form{

      background-color:rgba(0,0,0,0.6);
      border-radius: 2rem;
      padding:0 4rem;
      .title{
        font-size: 3rem;
        font-weight: 400;
       .container{
        input{
          background-color: azure !important;
          padding: 0.4rem 4rem;
          margin-top: 2rem;
          width: 100%;
          color:black;
          &:focus{
            background-color: white;

          }
        }
      } 
    }
    button{
      
      cursor:pointer;
   color:white;
   margin-top: 2rem;
    font-size: large;
   cursor: pointer;
    padding: 0.75rem 1.5rem;
   background-color: red;
   outline: none;
   border-radius:0.3rem;
   
   border:none;

    }
          
    }

  }
  

}
`;



