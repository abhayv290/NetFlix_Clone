import React, {useState} from 'react'
import logo from '../assets/logo.png'
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import {FaSearch, FaPowerOff} from "react-icons/fa";
import {firebaseAuth} from '../utils/firebase_config';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
export default function Navbar({isscroll}) {
    console.log(isscroll);
    const [showSearch, setshowSearch] = useState(false);
    const [inputhover, setinputhover] = useState(false);
    const navigate = useNavigate();
    const links = [{name: 'Home', link: '/'},
    {name: 'Movies', link: '/Movies'},
    {name: 'TvShows', link: '/TvShows'},
    {name: 'MyList', link: '/myList'},
    {name: 'Sports', link: '/Sports'}]


    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate('/login');
    })
    return (
        <Container>
            <nav className={`flex ${isscroll ? "scrolled" : ""}`} >
                <div className="left flex a-center">
                    <div className="brand flex j-center a-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className='links flex'>
                        {links.map(({name, link}) => (
                            <li key={name}><Link to={link} >{name}</Link></li>
                        ))}

                    </ul>
                </div>
                <div className='right flex a-center'>
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button onFocus={() => setshowSearch(true)} onBlur={() => {if (!inputhover) setshowSearch(false)}}><FaSearch /></button>
                        <input type="text" placeholder='search' onMouseEnter={() => setinputhover(true)} onMouseLeave={() => setinputhover(false)}
                            onBlur={() => {
                                setinputhover(false);
                                setshowSearch(false);
                            }} />
                    </div>
                    <button onClick={() => {
                        confirm("Do you want to Logout from the app");
                        signOut(firebaseAuth)
                    }}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    )
}
const Container = styled.div`
.scrolled{
    background-color: #020317;
    z-index: 10;
    background-color: rgba(0,0,0,0.9);
    transition: 0.6s ease-in-out;
}
nav{
    position: fixed;
    z-index: 10;
    top: 0;
    height: 7rem;
    width:100%;
    justify-content: space-between;
    padding:1rem 4rem;    
    .left{
    gap:2rem;
        .brand{
            img{
                height: 7rem;
            }
        }
        .links{
            list-style: none;
            li{
                margin:0 3rem;
                font-size: 1rem;
                a{
                    color: white;
                    font-weight: 700;
                    text-decoration: none !important;
                    &:hover{
                        color:red;
                        font-weight: 900;
                    }
                }
            }
        }
    }
    .right{
        gap:1rem;
        
        button{
            background-color: transparent;
            border:none;
            cursor:pointer;
            &:focus{
                outline:none
            }
            svg{
                color:red;
                font-size:1.5rem;
                &:hover{
                    font-weight: 700;
                    color: #c30303;
                }
            }
        }
        .search{
            display: flex;
            justify-content: center;
            align-items:center;
            padding:0.3rem ;
            padding-left:0.4rem;
            button{
                background-color:transparent;
            }
            svg{
                color:white;
            }
            input{
                width:0;
                opacity:0;
                transition:0.4s ease-in-out;
                
                visibility:hidden;
                background-color: transparent;
               color:white;
                border:none;
               
                &:focus{
                    outline:none; 
                }
            }
        }
        .show-search{
            border:1px white solid;
            background-color: rgba(0,0,0,0.7);
            input{
                width:100%;
                visibility: visible;
                opacity:1;
                 border-radius: 0.4rem;
                padding: 0 2rem
            }
    }
                
         
                

         

    }
        
}


             
             
            

    
`;
