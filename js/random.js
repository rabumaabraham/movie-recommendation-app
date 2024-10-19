document.addEventListener("DOMContentLoaded", () => {
    console.log("Random movies script loaded");
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const randomMoviesSection = document.getElementById('randomMoviesSection');
const randomMovieList = document.getElementById('random-movie-list');
const nextRandomButton = document.getElementById('nextRandomButton');
const previousRandomButton = document.getElementById('previousRandomButton');

let currentPage = 1; // Start at the first page
const moviesPerPage = 15; // Limit to 15 movies per page

// Function to fetch random movies
async function fetchRandomMovies(page) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();

        // Clear existing movies
        randomMovieList.innerHTML = '';

        // Shuffle and select movies for the current page
        const shuffledMovies = data.results.sort(() => 0.5 - Math.random()).slice(0, moviesPerPage);
        shuffledMovies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            randomMovieList.appendChild(movieItem);
        });

        // Update pagination buttons
        updateRandomPagination(data.page, data.total_pages);

        // Show the random movies section
        randomMoviesSection.style.display = 'block';

    } catch (error) {
        console.error('Error fetching random movies:', error);
    }
}

// Function to update pagination buttons
function updateRandomPagination(current, total) {
    currentPage = current; // Update the current page

    previousRandomButton.style.display = current > 1 ? 'block' : 'none'; // Show or hide the previous button
    nextRandomButton.style.display = current < total ? 'block' : 'none'; // Show or hide the next button
}

// Event listeners for pagination buttons
nextRandomButton.addEventListener('click', () => fetchRandomMovies(currentPage + 1));
previousRandomButton.addEventListener('click', () => fetchRandomMovies(currentPage - 1));

// Call the function on page load
fetchRandomMovies(currentPage);