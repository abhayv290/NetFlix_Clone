// eslint-disable-next-line no-unused-vars
import React from 'react'
import styled from 'styled-components'
import {useState, useEffect} from 'react';
import Background from '../Components/Background'
import {firebaseAuth} from '../utils/firebase_config'
import Header from '../Components/Header';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
export default function Signup(props) {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [formdata, setFormdata] = useState(
    {
      email: "",
      password: ""
    }
  )
  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.name]: e.target.value})
  }
  const handleSignUp = async () => {
    console.log(formdata);
    const {email, password} = formdata;
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
    <Container showpassword={showpassword}>

      <Background />
      <div className="content">
        <Header login={props.login} />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies ,TV shows and More </h1>
            <h2>Watch anywhere    cancel anytime</h2>
            <h3>Ready to watch? Enter your email to create or restart memberShip</h3>
          </div>
          <div className="form">
            <input onChange={handleChange} name='email' value={formdata.email} placeholder='email-address' type="email" />
            {showpassword && <input onChange={handleChange} type="password" value={formdata.password} name='password' placeholder='password' />}

            {!showpassword && <button onClick={() => {setshowpassword(true)}}>Get Started</button>}
          </div>
          <button onClick={() => {handleSignUp(true)}} className='btn-sign'>Signup</button>

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
  
  display: grid;
  grid-template-rows: 15vh 85vh;
  .body{
    gap:1rem;
    .text{
      gap:1rem;
      text-align: center;
      font-size:1.5rem;
      h1{
        padding:0 20rem;
      }
    }
    .form{
      display:grid;
      grid-template-columns:${({showpassword}) => showpassword ? "1fr 1fr" : "2fr 1fr"};
      width:50%;
      input{
       background-color: white;
       border:none;
        color:black;
        outline:none;
        
        font-size: 1.3rem;
        padding:0.70rem;
      }
      button{
      cursor:pointer;
        
      color:white;
       font-size: large;
      cursor: pointer;
       padding: 0.75rem 1.5rem;
      background-color: red;
      outline: none;
      border:none;
  }
    
  }
  }
 .btn-sign{
     cursor:pointer;
        
     color: white;
   font-size: large;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    background-color: red;
    border-radius:5px;
    border:none;
    outline: none;
  }
  .btn-sign:hover{
    background-color: #ee0631da;
  }
  .btn-sign:hover:active{
    background-color: #ff0000b0;
  }
}
`;



