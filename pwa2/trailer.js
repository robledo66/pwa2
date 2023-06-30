// trailer.js

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
  
    const apiKey = 'ea282796';
  
    function searchTrailers(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm === '') {
        alert('Ingresa un término de búsqueda');
        return;
      }
  
      resultsContainer.innerHTML = '';
  
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la solicitud a la API');
          }
        })
        .then(function(data) {
          if (data.Response === 'True') {
            const movies = data.Search;
            movies.forEach(function(movie) {
              const movieElement = document.createElement('div');
              movieElement.classList.add('movie');
  
              const movieTitle = document.createElement('h2');
              movieTitle.textContent = movie.Title;
  
              const moviePoster = document.createElement('img');
              moviePoster.src = movie.Poster;
  
              const trailerButton = document.createElement('button');
              trailerButton.textContent = 'Ver Trailer';
              trailerButton.classList.add('trailer-button');
              trailerButton.addEventListener('click', function() {
                window.open(`https://www.youtube.com/watch?v=${movie.imdbID}`);
              });
  
              movieElement.appendChild(movieTitle);
              movieElement.appendChild(moviePoster);
              movieElement.appendChild(trailerButton);
  
              resultsContainer.appendChild(movieElement);
            });
          } else {
            throw new Error('No se encontraron películas');
          }
        })
        .catch(function(error) {
          console.error('Error al realizar la solicitud:', error);
          alert('Se produjo un error al buscar trailers');
        });
    }
  
    searchButton.addEventListener('click', function(event) {
      searchTrailers(event);
    });
  });
  