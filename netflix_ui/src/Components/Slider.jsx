import React, {memo} from 'react'
import CardSlider from './CardSlider'

export default memo(function Slider({movies}) {
    // console.log(movies);
    const getMovieFromRange = (from, to) => {

        return movies.slice(from, to);
    }
    return (
        <div>
            <CardSlider title="Trending Now" data={getMovieFromRange(0, 10)} />
            <CardSlider title="New Releases" data={getMovieFromRange(10, 20)} />
            <CardSlider title="Romantics Hits" data={getMovieFromRange(20, 30)} />
            <CardSlider title="Comedy Movies" data={getMovieFromRange(30, 40)} />
            <CardSlider title="Action se Bhara" data={getMovieFromRange(40, 50)} />
            <CardSlider title="Amazing Thriller" data={getMovieFromRange(50, 60)} />
        </div>
    )
});
