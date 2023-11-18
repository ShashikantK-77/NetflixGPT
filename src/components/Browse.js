import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';



const Browse = () => {

  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch)

 useNowPlayingMovies();
 usePopularMovies();
 useTrendingMovies();
 useUpcomingMovies();
  

 

  return (
    <div>
    <Header/>
    {
      showGPTSearch ? (
        <GPTSearch/>
      ):(
        <>
        <MainContainer/>
    <SecondaryContainer/>
        </>
      )
    }
   


    {/* {
        Maincontainer

    } */}
    </div>
  )
}

export default Browse