/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const overlayStyle = css`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 100;
`;

const imageStyle = css`
  width: 40%;
  height: 100%;
  object-fit: cover;
`;

const contentStyle = css`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const labelsStyle = css`
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 1rem;
  text-align: center;
`;

const nutrientInfoStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background: #f4f4f4;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const nutrientItemStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
`;

const nutrientValueStyle = css`
  font-weight: bold;
  color: #333;
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

const caloriesStyle = css`
  font-weight: bold;
  font-size: 2rem;
`;

const closeButtonStyle = css`
  align-self: flex-end;
  cursor: pointer;
  font-size: 2rem;
  color: #888;
  &:hover {
    color: #333;
  }
`;

const instructionsStyle = css`
  margin-top: 1rem;
`;

const ingredientsStyle = css`
  margin-bottom: 1rem;
`;

const dietaryDetailsStyle = css`
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
  padding-top: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const RecipeOverlayCard = ({ recipe, onClose }) => {
  const {
    label,
    image,
    dietLabels = [],
    totalNutrients = {},
    ingredientLines = [],
    healthLabels = [],
  } = recipe;

  const protein = totalNutrients.PROCNT
    ? totalNutrients.PROCNT.quantity.toFixed(1)
    : "N/A";
  const fat = totalNutrients.FAT
    ? totalNutrients.FAT.quantity.toFixed(1)
    : "N/A";
  const carbs = totalNutrients.CHOCDF
    ? totalNutrients.CHOCDF.quantity.toFixed(1)
    : "N/A";
  const calories = recipe.calories ? recipe.calories.toFixed(0) : "N/A";

  return (
    <div css={overlayStyle}>
      <img src={image} alt={label} css={imageStyle} />
      <div css={contentStyle}>
        <span css={closeButtonStyle} onClick={onClose}>
          &times;
        </span>
        <div css={titleStyle}>{label}</div>
        <div css={labelsStyle}>{dietLabels.join(" • ")}</div>

        <div css={dietaryDetailsStyle}>{healthLabels.join(" • ")}</div>

        <div css={nutrientInfoStyle}>
          <div css={nutrientItemStyle}>
            <span css={caloriesStyle}>{calories} kcal</span>
          </div>
          <div css={nutrientItemStyle}>
            <div>
              <span css={proteinDotStyle}> • </span>
              <span>PROTEIN</span>
            </div>
            <span css={nutrientValueStyle}>{protein} g</span>
          </div>
          <div css={nutrientItemStyle}>
            <div>
              <span css={fatDotStyle}> • </span>
              <span>FAT</span>
            </div>
            <span css={nutrientValueStyle}>{fat} g</span>
          </div>
          <div css={nutrientItemStyle}>
            <div>
              <span css={carbDotStyle}> • </span>
              <span>CARB</span>
            </div>
            <span css={nutrientValueStyle}>{carbs} g</span>
          </div>
        </div>
        <div css={instructionsStyle}>
          <h3>Ingredients:</h3>
          <ul css={ingredientsStyle}>
            {ingredientLines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeOverlayCard;
