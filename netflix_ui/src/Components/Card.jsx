import React, {memo, useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom';
import video from '../assets/video1.mp4'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {RiThumbUpFill, RiThumbDownFill} from 'react-icons/ri'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'

export default memo(function Card({movieData, isLiked = false}) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >

            {!isHovered && <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="cover_image" />
            }
            {isHovered && (
                <div className="hover">
                    <div className="img-vide-container">
                        <img onClick={() => navigate('/Player')} src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} />
                        <video autoPlay loop muted src={video}></video>
                    </div>
                    <div className="info-container flex column">
                        <h3 className='name' onClick={() => navigate('/Player')} >{movieData.name}</h3>
                        <div className="icons flex j-between">
                            <div className="controls flex">
                                <IoPlayCircleSharp title='play' onClick={() => navigate('/Player')} />
                                <RiThumbUpFill title='like' />
                                <RiThumbDownFill title='dislike' />
                                {isLiked ? <BsCheck title='Remove from list' /> : <AiOutlinePlus title='Add to the My-List' />}
                            </div>
                            <div className="info">
                                <BiChevronDown title='More-info' />
                            </div>
                        </div>
                        <div className="genres flex">
                            <ul className='flex'> {movieData.genres.map((genre) => (
                                <li key={genre} >{genre}</li>
                            ))}</ul>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
});

const Container = styled.div`
max-width:20rem;
width:16rem;
height:100%;
cursor:pointer;
position :relative;
img{
    border-radius: 8px;
    width:100%;
    margin:4px;
    padding:5px;
    height:100%;
    z-index:8;
}
.hover{
    z-index:10;
    height:max-content;
    width:20rem;
    position: absolute;
    top:-18vh;
    left:0;
    border-radius:10px;
    box-shadow:rgba(0,0,0,0.80) 0px 3px 10px ; 
    background-color:#181818;
    transition: 0.3s ease-in-out;
    .img-vide-container{
        position:relative;
        height:140px;
        img{
            position:absolute;
            top:0;
            z-index:4;
            width:100%;
            height:140px;
            object-fit:cover;
            border-radius: 10px;
        }
        video{
            width:100%;
            height:140px;
            object-fit:cover;
            border-radius:10px;
            position:absolute;
            top:0;
            z-index:5;
        }
    }
    .info-container{
        padding:1rem;
        gap:0.5rem;
    }
        

    .icons{
        .controls{
            display:flex;
            gap:1rem;
        }svg{
            font-size:2rem;
            cursor:pointer;
            transition:0.4s ease-in-out;
            &:hover{
                color: #c0beff;
                scale: 1.2 ;
            }
        }
    }
    .genres{
        ul{
            gap:1rem;
            li{
                padding-right:0.7rem;
                &:first-of-type{ 
                    list-style:none;
                }
            }
        }
    }
        
}




`;