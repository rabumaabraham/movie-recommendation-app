document.addEventListener("DOMContentLoaded", () => {
    console.log("Search movies script loaded");
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const searchSection = document.getElementById('searchSection');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchButton = document.getElementById('searchButton');
const nextSearchButton = document.getElementById('nextSearchButton');
const previousSearchButton = document.getElementById('previousSearchButton');

let currentSearchPage = 1; // Start at the first page
const moviesPerPage = 15; // Limit to 15 movies per page

// Function to search movies
async function searchMovies(query, page) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${page}`);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();

        // Clear existing results
        searchResults.innerHTML = '';

        // Display results
        data.results.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            searchResults.appendChild(movieItem);
        });

        // Update pagination buttons
        updateSearchPagination(data.page, data.total_pages);
        searchSection.style.display = 'block'; // Show the search section

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

// Function to update pagination buttons
function updateSearchPagination(current, total) {
    currentSearchPage = current; // Update the current page

    previousSearchButton.style.display = current > 1 ? 'block' : 'none'; // Show or hide the previous button
    nextSearchButton.style.display = current < total ? 'block' : 'none'; // Show or hide the next button
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        currentSearchPage = 1; // Reset to first page
        searchMovies(query, currentSearchPage);
    }
});

// Event listeners for pagination buttons
nextSearchButton.addEventListener('click', () => searchMovies(searchInput.value.trim(), currentSearchPage + 1));
previousSearchButton.addEventListener('click', () => searchMovies(searchInput.value.trim(), currentSearchPage - 1));