import React from 'react'
import styled from 'styled-components'
import backgroundImage from '../assets/background.jpg'
export default function Background() {
    return (
        <Container>
            <img src={backgroundImage} alt="backgroundImage" />
        </Container>
    )
}

const Container = styled.div`
height:100vh;
width:100vw;
img{
    height:100vh;
    width:100vw;
}
`;






