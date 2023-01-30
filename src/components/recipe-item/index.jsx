import React from 'react'
import './style.css'
import {ThemeContext} from '../../App';

function RecipesItem(props) {

  const {id,image,title, addToFavorites} = props;
  const {theme} = React.useContext(ThemeContext) 
  return (
    <div key={id} className='recipe-item'>
        <div>
            <img src={image} alt="recipe" />
        </div>
        <p style={theme ? {color:"#12343b"}:{}}>{title}</p>
        <button type="button" style={theme ? {backgroundColor:"#12343b"}:{}} onClick={addToFavorites}>Add to Favorites</button>
    </div>
  )
}

export default RecipesItem