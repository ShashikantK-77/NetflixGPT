import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { addTrendingMovies } from '../utils/moviesSlice'

const useTrendingMovies = () =>{
    const dispatch = useDispatch();
 
    const nowTrendingMovies = useSelector(store=>store.movies.nowTrendingMovies)
    useEffect(()=>{
      if(!nowTrendingMovies){
        getTrendingMovies()
      }
    
    },[])
 
  
    const getTrendingMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/trending/all/day?language=hi-IN',
        API_OPTIONS
        );
      const json = await data.json();
    //   console.log(json.results);
      dispatch(addTrendingMovies(json.results))
      
    }
  
}

export default useTrendingMovies