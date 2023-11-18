import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
       nowPlayingMovies:null,
       trailerVideo:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.nowPopularMovies = action.payload;
        },
        addTrendingMovies:(state,action)=>{
            state.nowTrendingMovies = action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            state.UpcomingMovies = action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo = action.payload
        }
    }
});

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTrendingMovies,addUpcomingMovies} = moviesSlice.actions;
export default moviesSlice.reducer;