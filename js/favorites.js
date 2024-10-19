document.addEventListener("DOMContentLoaded", () => {
    console.log("Favorites script loaded");
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const favoritesSection = document.getElementById('favoritesSection');
const favoritesMovieList = document.getElementById('favorites-movie-list');
const nextFavoritesButton = document.getElementById('nextFavoritesButton');
const previousFavoritesButton = document.getElementById('previousFavoritesButton');

let currentPage = 1; // Start at the first page
const moviesPerPage = 15; // Limit to 15 movies per page
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

// Function to display favorite movies
function displayFavoriteMovies(page) {
    favoritesMovieList.innerHTML = '';

    // Paginate favorites
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToDisplay = favoriteMovies.slice(startIndex, endIndex);

    if (moviesToDisplay.length > 0) {
        moviesToDisplay.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            favoritesMovieList.appendChild(movieItem);
        });
    } else {
        favoritesMovieList.innerHTML = '<p>No favorite movies found.</p>';
    }

    // Update pagination buttons
    updateFavoritesPagination();
    favoritesSection.style.display = 'block';
}

// Function to update pagination buttons
function updateFavoritesPagination() {
    previousFavoritesButton.style.display = currentPage > 1 ? 'block' : 'none'; // Show or hide the previous button
    nextFavoritesButton.style.display = (currentPage * moviesPerPage) < favoriteMovies.length ? 'block' : 'none'; // Show or hide the next button
}

// Event listeners for pagination buttons
nextFavoritesButton.addEventListener('click', () => {
    currentPage++;
    displayFavoriteMovies(currentPage);
});
previousFavoritesButton.addEventListener('click', () => {
    currentPage--;
    displayFavoriteMovies(currentPage);
});

// Initialize the favorites section
displayFavoriteMovies(currentPage);