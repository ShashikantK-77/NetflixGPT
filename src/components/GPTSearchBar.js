import React, { useRef } from 'react'
import lang from '../utils/LanguageConstatnts'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constant'
import { addGptMovieResult } from '../utils/GPTSlice'

const GetSearchBar = () => {

  const dispatch = useDispatch()
  const langkey = useSelector(store =>store.config.lang)

  const SearchText = useRef(null)

  const handleGptSearchClick= async () =>{
    // console.log(SearchText.current.value);

    const gptquerry = "Act as a Movie Recommendation system and suggest some movies for the query : " +
    SearchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const GptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptquerry}],
      model: 'gpt-3.5-turbo',
    });
    if (!GptResults.choices) {
      // TODO: Write Error Handling
      console.log("!GptResults");
    }
    console.log(GptResults.choices?.[0]?.message?.content);

    const getMovies = GptResults.choices?.[0]?.message?.content.split(",");
    const PromiseArray = getMovies.map((movie)=>searchMovieTMDB(movie))

    const TmdbResults = await Promise.all(PromiseArray);

    console.log(TmdbResults);

    dispatch(addGptMovieResult({movieNames:getMovies,movieResults:TmdbResults}))


  }

  const searchMovieTMDB = async (Movie)=>{
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+Movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS)
      const json = await data.json();
      return json.results

    }
  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
    <form className='bg-black w-full md:w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>

      <input type='text' ref={SearchText} className='p-4 m-4 w col-span-9' placeholder={lang[langkey].GPTSearchPlaceholder} />
     
      <button className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4' onClick={handleGptSearchClick}>{lang[langkey].Search} </button>
    </form>
    </div>
  )
}

export default GetSearchBar