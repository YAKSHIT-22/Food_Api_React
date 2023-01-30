import React from "react";
import { ThemeContext } from "../../App";
import FavoriteItem from "../../components/favorites";
import RecipesItem from "../../components/recipe-item";
import Search from "../../components/search";
import "./style.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

function Homepage() {
  const [loading, setLoading] = React.useState(false);
  const [recipes, setRecipes] = React.useState([]);
  const [favorites, setFavorites] = React.useState([{"id":654959,"title":"Pasta With Tuna","image":"https://spoonacular.com/recipeImages/654959-312x231.jpg","imageType":"jpg"}]);
  const [apiCalledSuccess, setApiCalledSuccess] = React.useState(false);
  const [filteredState, dispatch] = React.useReducer(reducer, initialState);
  const {theme} = React.useContext(ThemeContext);
  React.useEffect(() => {}, []);
  const getData = (data) => {
    setLoading(true);
    async function getReceipes() {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=96e1a1448b76492fa46ec9acdd0539be&query=${data}`
      );
      const result = await response.json();
      const { results } = result;
      if (results && results.length > 0) {
        setLoading(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }
    getReceipes();
  };
   const addToFavorites = React.useCallback((getCurrentRecipeItem) => {
    let cpyFavorites = [...favorites];
    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    if (index === -1) {
      cpyFavorites.push(getCurrentRecipeItem);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
      window.scrollTo({top:'0',behavior:'smooth'});
    } else {
      alert("Item already in favorites");
    }
  },[favorites]);
  const removeFavorites = (getCurrent) => {
    let cpyFavorites = favorites && [...favorites];
    cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrent);
    setFavorites(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };

  React.useEffect(() => {
    const extractFavorites = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(extractFavorites);
  }, []);

  const filteredFavoritesItems = favorites && favorites.filter((item) => 
     item.title.toLowerCase().includes(filteredState.filteredValue)
  )

  const renderRecipes = React.useCallback(()=>{
    if(recipes && recipes.length > 0){
      return (
        recipes.map((item) => (
          <RecipesItem
            addToFavorites={() => addToFavorites(item)}
            id={item.id}
            image={item.image}
            title={item.title}
            item={item}
          />
        ))
      )
    }
   
  },[recipes,addToFavorites])
  return (
    <div className="homepage">
      <Search
        getData={getData}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />
      {loading && <div className="loading">Loading recipes ! Please wait.</div>}
      <div className="favorites-wrapper">
        <h1 style={theme ? {color:"#12343b"}:{}} className="favorites-title">Favorites</h1>
        <div className="search-favorite">
          <input
            onChange={(event)=>{dispatch({type: 'filterFavorites', value:event.target.value})}}
            type="text"
            name="search-favorite"
            placeholder="Search Favorites"
            value={filteredState.filteredValue}
          />
        </div>
        <div className="favorites">
        {
      filteredFavoritesItems && !filteredFavoritesItems.length && <div className="no-items">No Favorites are found</div>
      }
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  removeFavorites={() => removeFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  item={item}
                />
              ))
            : null}
        </div>
      </div>
      <div className="items">
       {renderRecipes()}
      </div>
      {
        !loading && !recipes.length && <div className="no-items">No Recipes are found</div>
      }
    </div>
  );
}

export default Homepage;
