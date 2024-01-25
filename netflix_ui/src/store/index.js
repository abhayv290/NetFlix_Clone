import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_KEY, TMDB_BASE_URL} from '../utils/react_constant'
import {getRedirectResult} from 'firebase/auth';
const INITIAL_STATE = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk('netflix/genres', async () => {
    try {
        const {data: {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        return genres;
    } catch (error) {
        // Handle error
        console.error('Error fetching genres:', error.message || error);
        throw error;
    }
});
const createArrayfromRawData = (array, movieAray, genres) => {
    // console.log(array);
    array.forEach((element) => {
        const movieGenre = [];
        element.genre_ids.forEach((genre) => {
            const name = genres.find(({id}) => id === genre);
            if (name) movieGenre.push(name.name);
        });
        if (element.backdrop_path) {
            movieAray.push({
                id: element.id,
                name: element?.original_name ? element.original_name : element.original_title,  //revisit
                image: element.backdrop_path,
                genres: movieGenre.slice(0, 3),
            })
        }
    });
}
const getRawData = async (api, genres, paging) => {
    const movieArray = [];
    for (let i = 1; movieArray.length < 100 && i < 10; i++) {
        try {
            const {data: {results}} = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
            // console.log(results);
            createArrayfromRawData(results, movieArray, genres);
        } catch (error) {
            // Handle error
            console.error('Error fetching raw data:', error.message || error);
            throw error;
        }
    }
    return movieArray;
};
export const getMovies = createAsyncThunk('netflix/trending/movies', async ({type}, thunkApi) => {
    try {
        const {netflix: {genres}, } = thunkApi.getState();
        return await getRawData(`${TMDB_BASE_URL}/trending/${type}/day?api_key=${API_KEY}`, genres, true);

    } catch (error) {
        // Handle error
        console.error('Error fetching movies:', error.message || error);
        throw error;
    }
});

const NetflixSlice = createSlice({
    name: 'Netflix',
    initialState: INITIAL_STATE,
    reducers: {}, // Add reducers if needed
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
                state.genresLoaded = true;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
            });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});
