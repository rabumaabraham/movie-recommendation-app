document.addEventListener("DOMContentLoaded", () => {
    console.log("Popular movies script loaded");

    // Initially hide popular movies section
    popularMoviesSection.style.display = 'none'; // Ensure it's hidden initially
    movieDetailsSection.style.display = 'none'; // Hide movie details initially

    // Call the function to fetch the first page of popular movies
    fetchPopularMovies(currentPage);
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const popularMoviesSection = document.getElementById('popularMoviesSection');
const movieList = document.getElementById('movie-list');
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
const movieDetailsSection = document.getElementById('movie-details');
const backButton = document.getElementById('backButton'); // New back button

let currentPage = 1; // Start at the first page
const moviesPerPage = 15; // Limit to 12 movies per page
let totalPages = 1; // Total number of pages, will be updated after fetching movies

// Function to fetch popular movies
async function fetchPopularMovies(page) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        totalPages = data.total_pages;  // Update total pages after fetching data

        // Clear existing movies
        movieList.innerHTML = '';

        // Display only the first 12 movies
        const moviesToDisplay = data.results.slice(0, moviesPerPage);
        moviesToDisplay.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.style.cursor = 'pointer'; // Make it look clickable
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieList.appendChild(movieItem);

            // Add event listener to each movie for showing details in full page
            movieItem.addEventListener('click', () => {
                showMovieDetails(movie);  // Display movie details when clicked
            });
        });

        // Update pagination buttons
        updatePagination(data.page, data.total_pages);

        // Remove the line below to prevent showing the popular movies section immediately
        // popularMoviesSection.style.display = 'block';

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
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {  // Ensure there are more pages
        fetchPopularMovies(currentPage + 1);
    }
});
previousButton.addEventListener('click', () => {
    if (currentPage > 1) {  // Ensure we're not on the first page
        fetchPopularMovies(currentPage - 1);
    }
});

// Function to show movie details in full page
function showMovieDetails(movie) {
    // Hide the popular movies section
    popularMoviesSection.style.display = 'none';

    // Create or update the movie details section for full-page view
    movieDetailsSection.innerHTML = `
        <button id="backButton" style="margin-bottom: 20px;">Back to Movies</button>
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
    `;

    movieDetailsSection.style.display = 'block';  // Show the details section

    // Add event listener for back button
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        // Hide the movie details section
        movieDetailsSection.style.display = 'none';
        // Show the popular movies section again
        popularMoviesSection.style.display = 'block';
    });
}
