document.addEventListener("DOMContentLoaded", () => {
    console.log("Genre recommendations script loaded");
});

import { TMDB_API_KEY } from './config.js'; // Import your API key

const genreSelect = document.getElementById('genreSelect');
const fetchGenreMoviesButton = document.getElementById('fetchGenreMoviesButton');
const genreMovieList = document.getElementById('genre-movie-list');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

let currentPage = 1;
const moviesPerPage = 15; // Total movies displayed at once (6*3)
let totalMovies = 0; // To track the total number of movies fetched
let totalPages = 1; // To track the total number of pages

// Function to fetch movies based on selected genre
async function fetchGenreMovies(genreId, page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        totalMovies = data.total_results; // Get total results for pagination
        totalPages = Math.ceil(totalMovies / moviesPerPage); // Calculate total pages

        // Clear existing movies
        genreMovieList.innerHTML = '';

        // Display movies
        data.results.slice(0, moviesPerPage).forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <p>Release Date: ${movie.release_date}</p>
            `;
            genreMovieList.appendChild(movieItem);
        });

        // Show or hide pagination buttons
        previousButton.style.display = currentPage > 1 ? 'block' : 'none';
        nextButton.style.display = currentPage < totalPages ? 'block' : 'none';

    } catch (error) {
        console.error('Error fetching genre movies:', error);
    }
}

// Event listener for the button
fetchGenreMoviesButton.addEventListener('click', () => {
    const selectedGenreId = genreSelect.value;
    if (selectedGenreId) {
        currentPage = 1; // Reset to first page
        fetchGenreMovies(selectedGenreId, currentPage); // Fetch movies for selected genre
    } else {
        alert("Please select a genre.");
    }
});

// Event listener for pagination buttons
previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--; // Decrease page number
        fetchGenreMovies(genreSelect.value, currentPage); // Fetch movies for selected genre
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++; // Increase page number
        fetchGenreMovies(genreSelect.value, currentPage); // Fetch movies for selected genre
    }
});
