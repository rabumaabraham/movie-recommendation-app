document.addEventListener("DOMContentLoaded", () => {
    console.log("Random movie script loaded");
});


// random
import { TMDB_API_KEY } from './config.js';  // Import your API key from config.js

const BASE_URL = 'https://api.themoviedb.org/3';
const randomMovieSection = document.getElementById('randomMovieSection');
const randomMovieDetail = document.getElementById('random-movie-detail');
const fetchRandomMovieButton = document.getElementById('fetchRandomMovieButton');

// Function to fetch a random movie
async function fetchRandomMovie() {
    try {
        // Get a list of popular movies to select a random one
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        const movies = data.results;
        
        // Select a random movie from the list
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];

        // Display random movie details
        randomMovieDetail.innerHTML = `
            <h2>${randomMovie.title}</h2>
            <p>Rating: ${randomMovie.vote_average}</p>
            <p>${randomMovie.overview || 'No overview available.'}</p>
            <img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}">
        `;

        // Show the random movie section
        randomMovieSection.style.display = 'block';

    } catch (error) {
        console.error('Error fetching random movie:', error);
    }
}

// Event listener for fetching a random movie
fetchRandomMovieButton.addEventListener('click', fetchRandomMovie);

// Call the function on initial load (if desired)
fetchRandomMovie();

