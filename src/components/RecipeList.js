/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import RecipeCard from "./RecipeCard";

const listStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const RecipeList = ({ recipes }) => {
  return (
    <div css={listStyle}>
      {recipes.map(({ recipe }) => (
        <RecipeCard key={recipe.uri} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
