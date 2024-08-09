
# Recipe App

## Overview

The Recipe App allows users to search for recipes using the Edamam API. Users can view recipe details, save recipes to a favorites list, and interact with a sidebar that displays their favorite recipes.

## Features

- **Search Recipes:** Users can search for recipes by entering keywords.
- **View Recipes:** Display a list of recipes with images and titles.
- **Favorite Recipes:** Add recipes to a favorites list.
- **Sidebar:** View and interact with favorite recipes from a sidebar.
- **Recipe Details:** Click on a recipe to view detailed information in an overlay card.
- **Responsive Design:** The application is designed to be mobile-friendly and responsive.

## Pictures
![image](https://github.com/user-attachments/assets/85ce58fa-1445-43c6-aa26-9992b6aa3cb4)
![image](https://github.com/user-attachments/assets/26f2e442-7000-4849-9045-1cdb3c0ba153)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Edamam API credentials:

   ```plaintext
   REACT_APP_EDAMAM_APP_ID=your_app_id
   REACT_APP_EDAMAM_APP_KEY=your_app_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Usage

1. **Search for Recipes:**
   - Enter a keyword in the search input field and click "Search".
   - Recipe cards will appear with images and titles.

2. **View Recipe Details:**
   - Click on a recipe card to open an overlay with more details about the recipe.

3. **Add to Favorites:**
   - Recipes can be added to the favorites list by clicking the "Favorite" button on the recipe card.

4. **View Favorites:**
   - Click the sidebar toggle button to view and interact with your list of favorite recipes.

5. **Load More Recipes:**
   - Click the "Load More" button to fetch additional recipes.

## Acknowledgements

- [Edamam API](https://developer.edamam.com/)
