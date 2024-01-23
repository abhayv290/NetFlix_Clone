// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import Navbar from '../Components/Navbar';
import {FaPlay} from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import styled from 'styled-components';
import backimage from '../assets/home.jpg';
import movielogo from '../assets/homeTitle.webp';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getGenres, getMovies} from '../store';
import {all} from 'axios';

export default function Netflix() {
  const [isscroll, setisscroll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  useEffect(() => {

    dispatch(getGenres());
  }, [])

  useEffect(() => {
    if (genresLoaded) dispatch(getMovies({type: "all"}))

  })





  window.onscroll = () => {
    setisscroll(scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };


  return (
    <Container>
      <Navbar isscroll={isscroll} />
      <div className="hero">

        <img src={backimage} alt="home-background" className="back-image" />
        <div className="container">
          <div className="logo">
            <img src={movielogo} alt="movielogo" />
            <div className="buttons flex">
              <button onClick={() => {navigate('/Player')}} className="play flex j-center a-center">
                <FaPlay />
                Play
              </button>
              <button className="flex j-center a-center">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;
    .back-image {
      filter: brightness(60%);
    }

    

    img {
      height: 100%;
      width: 100%;
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 3rem;

      .logo {
        img {
          height: 100%;
          width: 100%;
          margin-left: 4rem;
        }

        .buttons {
          margin: 5rem;
          gap: 2rem;

          .play {
            background-color: white;
            color: black;
          }

          button {
            font-size: 1.5rem;
            gap: 1rem;
            padding: 0.4rem 2rem;
            border: none;
            outline: none;
            border-radius: 5px;
            cursor: pointer;

            &:nth-of-type(2) {
              background-color: rgba(109,105,109,0.7);
              color: white;
            }
            &:hover{
              color:red;
                
              opacity:78%;
            }
              
            
          }
        }
      }
  }
}
`;

