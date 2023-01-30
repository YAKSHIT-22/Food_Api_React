import React from 'react'
import './style.css'
import {ThemeContext} from '../../App';

function FavoriteItem(props) {

  const {id,image,title, removeFavorites} = props;
  const {theme}=React.useContext(ThemeContext);
  return (
    <div key={id} className='favorite-item'>
        <div>
            <img src={image} alt="recipe" />
        </div>
        <p style={theme ? {color:"#12343b"}:{}}>{title}</p>
        <button type="button" style={theme ? {backgroundColor:"#12343b"}:{}} onClick={removeFavorites}>Remove from Favorites</button>
    </div>
  )
}

export default FavoriteItem