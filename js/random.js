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

if (!randomMoviesSection) {
    console.error("randomMoviesSection element is not found in the DOM.");
} else {
    console.log("randomMoviesSection found:", randomMoviesSection);
}

let currentPage = 1; // Start at the first page
const moviesPerPage = 18; // Limit to 18 movies per page

async function fetchRandomMovies(page) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        randomMovieList.innerHTML = '';

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

        updateRandomPagination(data.page, data.total_pages);
        randomMoviesSection.style.display = 'block';
    } catch (error) {
        console.error('Error fetching random movies:', error);
    }
}

function updateRandomPagination(current, total) {
    currentPage = current;
    previousRandomButton.style.display = current > 1 ? 'block' : 'none';
    nextRandomButton.style.display = current < total ? 'block' : 'none';
}

nextRandomButton.addEventListener('click', () => fetchRandomMovies(currentPage + 1));
previousRandomButton.addEventListener('click', () => fetchRandomMovies(currentPage - 1));

fetchRandomMovies(currentPage);
