import React from 'react'
import { useEffect } from 'react';
import { ThemeContext } from '../../App';
import './style.css'
function Search(props) {
  const [inputValue,setInputValue] = React.useState('')
  const {getData,apiCalledSuccess,setApiCalledSuccess} = props;
  const {theme}=React.useContext(ThemeContext);
  const handleInputValue=(event)=>{
    const {value}=event.target
    setInputValue(value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    getData(inputValue)
  }
  useEffect(()=>{
   if(apiCalledSuccess){
    setInputValue("");
    setApiCalledSuccess(false);
   }



  },[apiCalledSuccess,setApiCalledSuccess])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input type="text" onChange={handleInputValue} value={inputValue} name="search" placeholder="Search Recipes" id="search" />
      <button type="submit" style={theme ? {backgroundColor:"#12343b"}:{}}>Search</button>
    </form>
  )
}

export default Search;
