const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

const apiKey = 'ea282796';

function searchMovies(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        alert('Ingresa un término de búsqueda');
        return;
    }

    resultsContainer.innerHTML = '';

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud a la API');
            }
        })
        .then(function (data) {
            if (data.Response === 'True') {
                const movies = data.Search;
                movies.forEach(function (movie) {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');

                    const movieTitle = document.createElement('h2');
                    movieTitle.textContent = movie.Title;

                    const moviePoster = document.createElement('img');
                    moviePoster.src = movie.Poster;
                    const addToWatchlistButton = document.createElement('button');
                    addToWatchlistButton.textContent = 'Agregar a Películas a Mirar';
                    addToWatchlistButton.classList.add('button-add-to-watchlist');
                    addToWatchlistButton.addEventListener('click', function() {
                        addMovieToWatchlist(movie);
                    });
                    

                    movieElement.appendChild(movieTitle);
                    movieElement.appendChild(moviePoster);
                    movieElement.appendChild(addToWatchlistButton);

                    resultsContainer.appendChild(movieElement);
                });
            } else {
                throw new Error('No se encontraron películas');
            }
        })
        .catch(function (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Se produjo un error al buscar películas');
        });
}

function addMovieToWatchlist(movie) {
    const watchlist = getWatchlistFromLocalStorage();

    const isMovieInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);

    if (isMovieInWatchlist) {
        alert('La película ya está en tu lista de "Películas a Mirar"');
        return;
    }

    watchlist.push(movie);

    localStorage.setItem('watchlist', JSON.stringify(watchlist));

    alert('La película se agregó a tu lista de "Películas a Mirar"');
}

searchButton.addEventListener('click', function(event) {
    searchMovies(event);
});
