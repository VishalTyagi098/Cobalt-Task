/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const headerStyle = css`
  font-family: sans-serif;
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
`;

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
`;

const heartStyle = css`
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
`;

const Header = ({ onToggleSidebar }) => {
  return (
    <div css={headerStyle}>
      <div css={titleStyle}>Recipe Finder</div>
      <div css={heartStyle} onClick={onToggleSidebar}>
        ❤️ Favourites
      </div>
    </div>
  );
};

export default Header;
