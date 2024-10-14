// main.js
document.addEventListener("DOMContentLoaded", () => {
    // Event listeners to handle navigation clicks
    document.getElementById("popularMoviesNav").addEventListener("click", () => {
        displaySection("popularMoviesSection");
    });
    document.getElementById("genreNav").addEventListener("click", () => {
        displaySection("genreSection");
    });
    document.getElementById("favoritesNav").addEventListener("click", () => {
        displaySection("favoritesSection");
    });
    document.getElementById("randomMovieNav").addEventListener("click", () => {
        displaySection("randomMovieSection");
    });
    document.getElementById("searchNav").addEventListener("click", () => {
        displaySection("searchSection");
    });

    // Display popular movies section by default
    displaySection("popularMoviesSection");
});

// Function to display the selected section and hide others
function displaySection(sectionId) {
    const sections = [
        "popularMoviesSection",
        "genreSection",
        "favoritesSection",
        "randomMovieSection",
        "searchSection"
    ];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? "block" : "none";
    });
}
