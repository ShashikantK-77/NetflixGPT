import  { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constant'

const useMovieTrailer = (movieid) =>{
    const dispatch = useDispatch();


    const nowMovieVideos = useSelector(store=>store.movies.trailerVideo)
    
    const getMovieVideos = async () =>{
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/'+movieid+'/videos?language=en-US'
        ,API_OPTIONS);
        const json = await data.json();
        // console.log(json);
        const filterdata = json.results.filter(video => video.type === 'Trailer')
        const trailer = filterdata.length ? filterdata[0] : json.results[0] ;
    
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer))
    
      }
    
      useEffect(()=>{
      if(!nowMovieVideos){
        getMovieVideos()
      }
    
    },[])
}

export default useMovieTrailer