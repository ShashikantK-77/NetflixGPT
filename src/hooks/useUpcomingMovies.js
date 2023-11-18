import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/moviesSlice'

const useUpcomingMovies = () =>{
    const dispatch = useDispatch();
  
    const nowUpcomingMovies = useSelector(store=>store.movies.UpcomingMovies)
    
    useEffect(()=>{
      if(!nowUpcomingMovies){
        getUpcomingMovies()
      }
    
    },[])

  
    const getUpcomingMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        API_OPTIONS
        );
      const json = await data.json();
    //   console.log(json.results);
      dispatch(addUpcomingMovies(json.results))
      
    }
  
}

export default useUpcomingMovies