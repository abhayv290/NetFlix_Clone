import React, {useRef, memo, useState} from 'react'
import Card from './Card'
import styled from 'styled-components'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

const CardSlider = memo(
    function CardSlider({data, title}) {
        const [showControl, setShowControl] = useState(false);
        const [sliderPosition, setSliderPosition] = useState(false);
        const listRef = useRef();
        const handleDirection = (direction) => {
            let distance = listRef.current.getBoundingClientRect().x - 70;
            if (direction === 'left' && sliderPosition > 0) {
                listRef.current.style.transform = `translateX(${230 + distance}px)`
                setSliderPosition(sliderPosition - 1);
            }
            if (direction === 'right' && sliderPosition < 4) {
                listRef.current.style.transform = `translateX(${-230 + distance}px)`
                setSliderPosition(sliderPosition + 1);
            }
        }
        return (

            <Container className="flex column" onMouseEnter={() => setShowControl(true)} onMouseLeave={() => setShowControl(false)} >
                <h1>{title}</h1>
                <div className="wrapper">
                    <div className={`slider-action flex j-center a-center left ${!showControl ? 'none' : ''}`}>
                        <AiOutlineLeft onClick={() => handleDirection('left')} />
                    </div>
                    <div className='flex slider' ref={listRef}>
                        {data.map((item, index) => (
                            <Card key={index} movieData={item} index={index} />
                        ))}
                    </div>
                    <div className={`slider-action flex j-center a-center right ${!showControl ? 'none' : ''}`}>
                        <AiOutlineRight onClick={() => handleDirection('right')} />
                    </div>
                </div>

            </Container>
        )
    });
export default CardSlider;

const Container = styled.div`
    position:relative;
    gap:1rem;
    /* padding: 2rem; */
    h1{
        margin-top:50px;
        margin-left:30px;
    }
    .wrapper{
        .slider{
            width:max-content;
            gap:1rem;
            transform:translateX(0px);
            transition:0.3s ease-in-out;
            /* margin-left:20px; */

        }
        .slider-action{
            position:absolute;
            height:100%;
            width:50px;
            z-index:20;
            top:3.5rem;
            bottom:0;
            transition: 0.3s ease-in-out;
            svg{
                font-size:2rem;
            }
        }
        .none{
            display:none;
        }
            
            
            
        .left{
            left:0;
        }
        .right{
            right:0;
        }
    }
        
`;
