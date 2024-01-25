import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from "react-icons/bs";
import video from '../assets/video1.mp4'
import {useNavigate} from 'react-router-dom'
export default function Player() {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="player">
                <div onClick={() => {navigate('/')}} className="back">
                    <BsArrowLeft />
                </div>
                <video src={video} autoPlay loop controls muted ></video>
            </div>
        </Container>
    )
}
const Container = styled.div`
.player{
    width:100vw;
    height: 100vh;
    .back{
        position:absolute;
        padding: 2rem;
        z-index: 2;
        svg{
            font-size: 2rem;
            transition: 0.1s ease-in;
          
            cursor:pointer;
            &:hover{
                color: #a5d4fd;
                scale:1.4;
                
            }
        }
    }
    video{
        height: 100%;
        width: 100%;
        object-fit: cover;
        
    }
}
`;