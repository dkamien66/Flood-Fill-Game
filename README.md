### Flood-Fill-Game-Browser
# What
This project is a puzzle game using randomly colored tiles on a grid. The goal is to all of the tiles on the grid to one color. You start on any tile as your 'filled' territory. You must click on a horizontally or vertically adjacent tile (call this new_tile) to fill your 'filled' territory with the color of that adjacent tile (new_tile). This new tile is now part of your 'filled' territory and any other new tiles of that color that are touching any 'filled' tiles are also now part of your territory. The game continues until the goal is achieved.

# Why
I first came upon this idea with LeetCode's Flood Fill Question #733. It asks the user to perform a flood fill on a point in an image recursively. I recevied errors with the recursion, but the process of recursion interested me.
I wanted to make a game using the same recursion and I found a video (https://www.youtube.com/watch?v=cUOzp9_WO50) about Simon Tathum's Flood game. The game showed what I wanted to make, and so this project is my attempt at recreating it using my knowledge of HTML and JavaScript.

# How
I used HTML, CSS, and JavaScript. HTML for the grid, tiles, overall layout, and button. JavaScript for creating a grid object that has several funcions to check for valid tile selecting, to recursively look through filled territory, to react to button and tile clicking, and random color generation.
