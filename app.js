// OMDb API key and base URL
const API_KEY = 'dfeb90b7';  // Replace this with your actual API key
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=`;

function searchMovie() {
    const movieName = document.getElementById('movie-name').value;

    if (movieName) {
        const url = `${BASE_URL}${encodeURIComponent(movieName)}`;

        // Fetch movie data from OMDb API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    displayMovieInfo(data);
                } else {
                    displayError(data.Error);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                displayError('An error occurred while fetching the movie data.');
            });
    } else {
        displayError('Please enter a movie name.');
    }
}

// Function to display movie information
function displayMovieInfo(movie) {
    const movieInfoDiv = document.getElementById('movie-info');
    
    // Use a placeholder if the movie poster is not available
    const poster = movie.Poster !== "N/A" ? movie.Poster : 'no-poster.jpg'; // Fallback image
    
    movieInfoDiv.innerHTML = `
        <div>
            <img src="${poster}" alt="Movie Poster">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Rated:</strong> ${movie.Rated}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Cast:</strong> ${movie.Actors}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        </div>
    `;
}

// Function to display error messages
function displayError(message) {
    const movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}
