/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";
import RecipeOverlayCard from "./RecipeOverlayCard";

const sidebarStyle = css`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 88vh;
  padding: 1rem;
  background-color: #f8f8f8;
  overflow-y: auto;
`;

const cardStyle = css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const imageStyle = css`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const nameStyle = css`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const Sidebar = ({ onRecipeClick }) => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div css={sidebarStyle}>
      <h3>Favorites</h3>
      {favorites.map((recipe) => (
        <div
          key={recipe.uri}
          css={cardStyle}
          onClick={() => onRecipeClick(recipe)}
        >
          <img src={recipe.image} alt={recipe.label} css={imageStyle} />
          <div css={nameStyle}>{recipe.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
