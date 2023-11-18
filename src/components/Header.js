import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import {addUser,removeUser} from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toggleGPTSearchView } from '../utils/GPTSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
const dispatch = useDispatch();
const navigate = useNavigate()
const user = useSelector(store=>store.user)
const showgptsearch = useSelector(store=>store.gpt.showGPTSearch)
  const handlesignout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
  

    }).catch((error) => {
      // An error happened.
      
    });
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const {uid, email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
    navigate("/browse")

      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });

    return() => unsubscribe();
  },[])

  const gandleGPTsearch = () =>{
    //Toggle GPTsearch
    dispatch(toggleGPTSearchView())
  }

  const handleLanguageChange = (e) =>{

    dispatch(changeLanguage(e.target.value))
  }

  
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex flex-col md:flex-row justify-between  '>
    <img className='w-44 mx-auto md:mx-0'
     src={LOGO} alt='logo'/>
  
   { user && ( <div className='flex p-2 justify-between'>

   {showgptsearch &&(<select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
   {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option> )}
   </select>)}
   <button className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-4 my-2' onClick={gandleGPTsearch}>
   {showgptsearch ? "Homepage" : "GPT Search"} 
   </button>
    <img className='hidden md:block w-14 h-14 p-4'
     src={user.photoURL} alt='usericon'/>
    <button className="font-bold text-white " onClick={handlesignout}>Signout</button>
    </div>)}
    </div>
  )
}

export default Header