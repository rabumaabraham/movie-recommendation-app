document.addEventListener("DOMContentLoaded", () => {
    console.log("Random movie script loaded");
});


//////////////////////////////example
// random.js
import { TMDB_API_KEY } from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchRandomMovie(); // Call the function to fetch a random movie

    function fetchRandomMovie() {
        // Fetch a list of popular movies first to get a random movie ID
        const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

        fetch(popularMoviesUrl)
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovie = data.results[randomIndex]; // Get a random movie from the popular movies

                // Display random movie details
                const randomMovieDisplay = document.getElementById('randomMovieDisplay');
                randomMovieDisplay.innerHTML = `
                    <h3>${randomMovie.title}</h3>
                    <p>${randomMovie.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}">
                `;
            })
            .catch(error => console.error('Error fetching popular movies:', error));
    }
});
