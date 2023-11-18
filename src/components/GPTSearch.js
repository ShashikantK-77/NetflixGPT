import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMoviesSuggestion from './GPTMoviesSuggestion'
import { BG_URL } from '../utils/constant'

const GPTSearch = () => {
  return (
    <>
    <div className="fixed -z-10">
    <img
    className='h-screen object-cover'
      src= {BG_URL}
      alt="logo"
    />
  </div>
    <div className=''>
     

    <GPTSearchBar/>
    <GPTMoviesSuggestion/>
    </div>
    </>
  )
}

export default GPTSearch