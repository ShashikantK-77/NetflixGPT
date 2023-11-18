import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'

const usePopularMovies = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{
      if(!nowPoppularMovies){
        getPopularMovies()
      }
    
    },[])
  
    const nowPoppularMovies = useSelector(store=>store.movies.nowPopularMovies)

    const getPopularMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?page=2',
        API_OPTIONS
        );
      const json = await data.json();
    //   console.log(json.results);
      dispatch(addPopularMovies(json.results))
      
    }
  
}

export default usePopularMovies