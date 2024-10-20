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
        closeNav(); // Close nav after selection
    });

    popularMoviesNav.addEventListener('click', () => {
        showSection(popularMoviesSection);
        closeNav(); // Close nav after selection
    });

    genreNav.addEventListener('click', () => {
        showSection(genreSection);
        closeNav(); // Close nav after selection
    });

    randomMovieNav.addEventListener('click', () => {
        showSection(randomMovieSection);
        closeNav(); // Close nav after selection
    });

    searchNav.addEventListener('click', () => {
        showSection(searchSection);
        closeNav(); // Close nav after selection
    });

    // Initial setup to show the home section and hide others
    showSection(homeSection); // Initially show the home section only

    // Function to toggle the navigation menu on smaller screens
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'block') ? 'none' : 'block';
    });

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
