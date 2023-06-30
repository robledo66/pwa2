
const watchlistContainer = document.getElementById('watchlist-container');

// Función para obtener la lista de "Peliculas a Mirar" desde el almacenamiento local
function getWatchlistFromLocalStorage() {
  const watchlistJSON = localStorage.getItem('watchlist');
  if (watchlistJSON) {
    return JSON.parse(watchlistJSON);
  } else {
    return [];
  }
}

// Función para mostrar la lista de "Peliculas a Mirar" en la página
function displayWatchlist() {
  const watchlist = getWatchlistFromLocalStorage();
  watchlistContainer.innerHTML = '';

  if (watchlist.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No hay películas en tu lista de "Peliculas a Mirar"';
    watchlistContainer.appendChild(message);
  } else {
    watchlist.forEach(function(movie) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.Title;

      const moviePoster = document.createElement('img');
      moviePoster.src = movie.Poster;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Quitar';
      removeButton.addEventListener('click', function() {
        removeMovieFromWatchlist(movie);
        watchlistContainer.removeChild(movieElement);
      });

      movieElement.appendChild(movieTitle);
      movieElement.appendChild(moviePoster);
      movieElement.appendChild(removeButton);

      watchlistContainer.appendChild(movieElement);
    });
  }
}

// Función para eliminar una película de la lista de "Peliculas a Mirar"
function removeMovieFromWatchlist(movie) {
  const watchlist = getWatchlistFromLocalStorage();
  const updatedWatchlist = watchlist.filter(function(item) {
    return item.imdbID !== movie.imdbID;
  });

  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  alert('La película se eliminó de la lista de "Peliculas a Mirar"');
}

// Mostrar la lista de "Peliculas a Mirar" al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  displayWatchlist();
});

