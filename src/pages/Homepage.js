/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import Sidebar from "../components/Sidebar";
import { setSearchQuery } from "../redux/favoritesSlice";
import RecipeOverlayCard from "../components/RecipeOverlayCard";

const containerStyle = css`
  display: flex;
  font-family: sans-serif;
  position: relative;
`;

const bodyStyle = css`
  flex-grow: 1;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 50vw;
`;

const searchInputStyle = css`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid red;
  border-radius: 4px;
  outline: none;
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;

const searchButtonStyle = css`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

const buttonStyle = css`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: red;
  &:before {
    content: "";
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    border: 2px solid red;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

const overlayBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const query = useSelector((state) => state.favorites.searchQuery);
  const dispatch = useDispatch();

  const fetchRecipes = async (url) => {
    setLoading(true);
    const apiUrl =
      url ||
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits]);
      setNextPageUrl(response.data._links.next?.href || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    setRecipes([]);
    setNextPageUrl(null);
    fetchRecipes();
  };

  const handleLoadMore = () => {
    if (nextPageUrl) {
      fetchRecipes(nextPageUrl);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseOverlay = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Header onToggleSidebar={toggleSidebar} />
      <div css={containerStyle}>
        <div css={bodyStyle}>
          <form css={formStyle} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for recipes..."
              css={searchInputStyle}
            />
            <button type="submit" css={searchButtonStyle}>
              Search
            </button>
          </form>
          <RecipeList recipes={recipes} />
          {loading ? (
            <p css={loadingStyle}>Loading...</p>
          ) : (
            nextPageUrl && (
              <button css={buttonStyle} onClick={handleLoadMore}>
                Load More
              </button>
            )
          )}
        </div>
        {showSidebar && <Sidebar onRecipeClick={handleRecipeClick} />}
      </div>
      {selectedRecipe && (
        <>
          <div css={overlayBackgroundStyle} onClick={handleCloseOverlay}></div>
          <RecipeOverlayCard
            recipe={selectedRecipe}
            onClose={handleCloseOverlay}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
