document.addEventListener("DOMContentLoaded", () => {
    console.log("Popular movies script loaded");
});

//

import { TMDB_API_KEY } from './config.js';  // Import your API key from config.js

const BASE_URL = 'https://api.themoviedb.org/3';
const popularMoviesSection = document.getElementById('popularMoviesSection');
const movieList = document.getElementById('movie-list');
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');

let currentPage = 1; // Start at the first page
const moviesPerPage = 12; // Limit to 12 movies per page

// Function to fetch popular movies
async function fetchPopularMovies(page) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        
        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        
        // Clear existing movies
        movieList.innerHTML = '';

        // Display only the first 12 movies
        const moviesToDisplay = data.results.slice(0, moviesPerPage);
        moviesToDisplay.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieList.appendChild(movieItem);
        });

        // Update pagination buttons
        updatePagination(data.page, data.total_pages);

        // Show the popular movies section
        popularMoviesSection.style.display = 'block';

    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Function to update pagination buttons
function updatePagination(current, total) {
    currentPage = current; // Update the current page

    previousButton.style.display = current > 1 ? 'block' : 'none'; // Show or hide the previous button
    nextButton.style.display = current < total ? 'block' : 'none'; // Show or hide the next button
}

// Event listeners for pagination buttons
nextButton.addEventListener('click', () => fetchPopularMovies(currentPage + 1));
previousButton.addEventListener('click', () => fetchPopularMovies(currentPage - 1));

// Call the function on page load
fetchPopularMovies(currentPage);
