import React from 'react'
import logo from '../assets/logo.png'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'


export default function Header(props) {
    const navigate = useNavigate();
    return (
        <Container className='flex  a-center j-between'>
            <div className="logo">
                <img src={logo} alt="netflix_logo" />
            </div>
            <button onClick={() => navigate(props.login ? "/login" : "/signup")}>{props.login ? "Login" : "Signup"}</button>
        </Container>
    )
}
const Container = styled.div`
padding: 0 4rem;

.logo{
    img{
        height: 10rem;
    }
}
button{
    color: white;
   font-size: large;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    background-color: red;
    border-radius: 5px;
    border:none;
    outline: none;
}
`;

