/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import RecipeOverlayCard from "./RecipeOverlayCard";

// Keyframes for favorite button animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    background-color: transparent;
  }
  50% {
    transform: scale(1.2);
    background-color: rgba(255, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    background-color: transparent;
  }
`;

const cardStyle = css`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const imageStyle = css`
  width: 100%;
  height: auto;
`;

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const labelStyle = css`
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.5rem;
`;

const recipeInfoStyle = css`
  display: flex;
  padding: 1rem;
  background: #f4f4f4;
  font-size: 0.9rem;
  justify-content: space-between;
  align-items: center;
`;

const servingStyle = css`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const caloriesStyle = css`
  font-weight: bold;
  font-size: 2rem;
`;

const nutrientInfoStyle = css`
  display: flex;
  flex-direction: column;
`;

const nutrientItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const nutrientItemNameStyle = css`
  margin-right: 0.5rem;
`;

const nutrientValueStyle = css`
  font-weight: bold;
  margin-left: auto;
`;

const proteinDotStyle = css`
  color: green;
  font-size: 2rem;
  margin-right: 0.2rem;
`;

const fatDotStyle = css`
  color: yellow;
  font-size: 2rem;
  margin-right: 0.2rem;
`;

const carbDotStyle = css`
  color: red;
  font-size: 2rem;
  margin-right: 0.2rem;
`;

const overlayBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 50;
`;

const favoriteButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: red;
  animation: ${pulse} 0.6s ease;
`;

const RecipeCard = ({ recipe }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.uri === recipe.uri);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent click from propagating to parent elements
    dispatch(toggleFavorite(recipe));
  };

  const handleCardClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const protein = recipe.totalNutrients.PROCNT
    ? recipe.totalNutrients.PROCNT.quantity.toFixed(1)
    : "N/A";
  const fat = recipe.totalNutrients.FAT
    ? recipe.totalNutrients.FAT.quantity.toFixed(1)
    : "N/A";
  const carbs = recipe.totalNutrients.CHOCDF
    ? recipe.totalNutrients.CHOCDF.quantity.toFixed(1)
    : "N/A";
  const calories = recipe.calories ? recipe.calories.toFixed(0) : "N/A";
  const servings = recipe.yield ? recipe.yield : "N/A";

  return (
    <div>
      <div css={cardStyle} onClick={handleCardClick}>
        <img src={recipe.image} alt={recipe.label} css={imageStyle} />
        <div css={titleStyle}>
          {recipe.label}
          <button css={favoriteButtonStyle} onClick={handleFavoriteToggle}>
            {isFavorite ? "❤️" : "♡"}
          </button>
        </div>

        <div css={labelStyle}>{recipe.dietLabels.join(" • ")}</div>

        <div css={recipeInfoStyle}>
          <div>
            <div css={servingStyle}>{servings} servings</div>
            <div css={caloriesStyle}>
              {calories}
              <span
                style={{
                  marginLeft: "0.2rem",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
              >
                KCAL
              </span>
            </div>
          </div>
          <div css={nutrientInfoStyle}>
            <div css={nutrientItemStyle}>
              <span css={proteinDotStyle}> • </span>
              <span css={nutrientItemNameStyle}>PROTEIN</span>
              <span css={nutrientValueStyle}>{protein} g</span>
            </div>
            <div css={nutrientItemStyle}>
              <span css={fatDotStyle}> • </span>
              <span css={nutrientItemNameStyle}>FAT</span>
              <span css={nutrientValueStyle}>{fat} g</span>
            </div>
            <div css={nutrientItemStyle}>
              <span css={carbDotStyle}> • </span>
              <span css={nutrientItemNameStyle}>CARB</span>
              <span css={nutrientValueStyle}>{carbs} g</span>
            </div>
          </div>
        </div>
      </div>
      {showOverlay && (
        <>
          <div css={overlayBackgroundStyle} onClick={handleCloseOverlay}></div>
          <RecipeOverlayCard recipe={recipe} onClose={handleCloseOverlay} />
        </>
      )}
    </div>
  );
};

export default RecipeCard;
