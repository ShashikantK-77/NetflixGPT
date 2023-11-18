import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice(
    {
        name:'gpt',
        initialState:{
            showGPTSearch:false,
            movieResults: null,
            movieNames: null,
        },
        reducers:{
            toggleGPTSearchView:(state, action)=>{
                state.showGPTSearch = !state.showGPTSearch;
            },
            addGptMovieResult:(state,action)=>{
                const { movieNames, movieResults } = action.payload;
                state.movieNames = movieNames;
                state.movieResults = movieResults;
            }
        }
    }
)

export const {toggleGPTSearchView,addGptMovieResult} = GPTSlice.actions;

export default GPTSlice.reducer