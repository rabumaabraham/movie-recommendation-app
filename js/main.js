document.addEventListener("DOMContentLoaded", () => {
    console.log("Movie Recommendation App loaded");

    // Select navigation links
    const popularMoviesNav = document.getElementById('popularMoviesNav');
    const genreNav = document.getElementById('genreNav');
    const favoritesNav = document.getElementById('favoritesNav');
    const randomMovieNav = document.getElementById('randomMovieNav');
    const searchNav = document.getElementById('searchNav');
    const homeNav = document.getElementById('homeNav'); // Select the home navigation link

    // Select sections
    const homeSection = document.getElementById('homeSection');
    const popularMoviesSection = document.getElementById('popularMoviesSection');
    const randomMovieSection = document.getElementById('randomMovieSection');
    const searchSection = document.getElementById('searchSection');
    const genreSection = document.getElementById('genreSection');
    const favoritesSection = document.getElementById('favoritesSection'); // Ensure this is defined

    // Function to show the selected section and hide others
    function showSection(sectionToShow) {
        // Hide all sections
        homeSection.style.display = 'none';
        popularMoviesSection.style.display = 'none';
        randomMovieSection.style.display = 'none';
        searchSection.style.display = 'none';
        if (genreSection) genreSection.style.display = 'none';
        if (favoritesSection) favoritesSection.style.display = 'none';

        // Show the selected section
        sectionToShow.style.display = 'block';
    }

    // Event listeners for navigation
    homeNav.addEventListener('click', () => {
        showSection(homeSection); // Show home section only
    });

    popularMoviesNav.addEventListener('click', () => showSection(popularMoviesSection));
    genreNav.addEventListener('click', () => showSection(genreSection));
    favoritesNav.addEventListener('click', () => showSection(favoritesSection));
    randomMovieNav.addEventListener('click', () => showSection(randomMovieSection));
    searchNav.addEventListener('click', () => showSection(searchSection));

    // Initial setup to show the home section and hide others
    showSection(homeSection); // Initially show the home section only
});
