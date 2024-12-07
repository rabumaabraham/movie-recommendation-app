document.addEventListener("DOMContentLoaded", () => {
    console.log("Movie Recommendation App loaded");

    // Select navigation links
    const popularMoviesNav = document.getElementById('popularMoviesNav');
    const genreNav = document.getElementById('genreNav');
    const randomMovieNav = document.getElementById('randomMovieNav');
    const searchNav = document.getElementById('searchNav');
    const homeNav = document.getElementById('homeNav'); // Select the home navigation link

    // Select sections
    const homeSection = document.getElementById('homeSection');
    const popularMoviesSection = document.getElementById('popularMoviesSection');
    const randomMovieSection = document.getElementById('randomMovieSection');
    const searchSection = document.getElementById('searchSection');
    const genreSection = document.getElementById('genreSection');

    // Function to show the selected section and hide others
    function showSection(sectionToShow) {
        // Hide all sections
        homeSection.style.display = 'none';
        popularMoviesSection.style.display = 'none';
        randomMovieSection.style.display = 'none';
        searchSection.style.display = 'none';
        if (genreSection) genreSection.style.display = 'none';

        // Show the selected section
        sectionToShow.style.display = 'block';
    }

    // Event listeners for navigation
    homeNav.addEventListener('click', () => {
        showSection(homeSection); // Show home section only
        closeNavIfMobile(); // Close nav if in mobile view
    });

    popularMoviesNav.addEventListener('click', () => {
        showSection(popularMoviesSection);
        closeNavIfMobile(); // Close nav if in mobile view
    });

    genreNav.addEventListener('click', () => {
        showSection(genreSection);
        closeNavIfMobile(); // Close nav if in mobile view
    });

    randomMovieNav.addEventListener('click', () => {
        showSection(randomMovieSection);
        closeNavIfMobile(); // Close nav if in mobile view
    });

    searchNav.addEventListener('click', () => {
        showSection(searchSection);
        closeNavIfMobile(); // Close nav if in mobile view
    });

    // Initial setup to show the home section and hide others
    showSection(homeSection); // Initially show the home section only

    // Function to toggle the navigation menu on smaller screens
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'block') ? 'none' : 'block';
    });

    // Function to close the navigation menu if in mobile view
    function closeNavIfMobile() {
        if (window.innerWidth <= 768) { // Adjust this breakpoint as needed
            closeNav(); // Hide nav links only on mobile
        }
    }

    // Function to close the navigation menu
    function closeNav() {
        navLinks.style.display = 'none'; // Hide nav links
    }

    // Close the nav menu when clicking anywhere outside of the nav links
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInsideNav && navLinks.style.display === 'block') {
            closeNav(); // Close nav if the click is outside
        }
    });
});

///

document.addEventListener("DOMContentLoaded", () => {
    console.log("Movie Recommendation App loaded");

    // Call the function to fetch action movies
    fetchActionMovies();
});

// Import your API key from config.js
import { TMDB_API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const homeSection = document.getElementById('homeSection');
let currentMovieIndex = 0; // To track the current movie being displayed
let moviePosters = []; // Array to store movie posters

// Function to fetch action movies
async function fetchActionMovies() {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28&language=en-US&page=1`);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();

        // Store the movie posters in an array
        moviePosters = data.results.map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

        // Set the first movie poster as the background
        setBackgroundImage();

        // Start changing the background every 5 seconds
        setInterval(changeBackground, 5000);

    } catch (error) {
        console.error('Error fetching action movies:', error);
    }
}

// Function to set the background image to the current movie poster
function setBackgroundImage() {
    if (moviePosters.length > 0) {
        homeSection.style.backgroundImage = `url('${moviePosters[currentMovieIndex]}')`;
    }
}

// Function to change the background image to the next movie poster
function changeBackground() {
    // Move to the next movie in the list
    currentMovieIndex = (currentMovieIndex + 1) % moviePosters.length; // Loop back to the first movie after reaching the end
    setBackgroundImage();
}

