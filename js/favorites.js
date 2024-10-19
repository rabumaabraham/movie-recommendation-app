document.addEventListener("DOMContentLoaded", () => {
    console.log("Box Office movies script loaded");
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const boxOfficeSection = document.getElementById('boxOfficeSection');
const boxOfficeList = document.getElementById('box-office-list');
const nextBoxOfficeButton = document.getElementById('nextBoxOfficeButton');
const previousBoxOfficeButton = document.getElementById('previousBoxOfficeButton');

let boxOfficePage = 1; // Start at the first page
const boxOfficeMoviesPerPage = 15; // Limit to 15 movies per page

// Function to fetch box office movies
async function fetchBoxOfficeMovies(page) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();

        // Clear existing movies
        boxOfficeList.innerHTML = '';

        // Select movies for the current page
        const boxOfficeMovies = data.results.slice(0, boxOfficeMoviesPerPage);
        boxOfficeMovies.forEach((movie, index) => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${index + 1}. ${movie.title}</h3>  <!-- Rank from 1 to 15 -->
                <p>Rating: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            boxOfficeList.appendChild(movieItem);
        });

        // Update pagination buttons
        updateBoxOfficePagination(data.page, data.total_pages);

        // Show the box office section
        boxOfficeSection.style.display = 'block';

    } catch (error) {
        console.error('Error fetching box office movies:', error);
    }
}

// Function to update pagination buttons
function updateBoxOfficePagination(current, total) {
    boxOfficePage = current; // Update the current page

    previousBoxOfficeButton.style.display = current > 1 ? 'block' : 'none'; // Show or hide the previous button
    nextBoxOfficeButton.style.display = current < total ? 'block' : 'none'; // Show or hide the next button
}

// Event listeners for pagination buttons
nextBoxOfficeButton.addEventListener('click', () => fetchBoxOfficeMovies(boxOfficePage + 1));
previousBoxOfficeButton.addEventListener('click', () => fetchBoxOfficeMovies(boxOfficePage - 1));

// Call the function on page load
fetchBoxOfficeMovies(boxOfficePage);