// Zugriff auf das movies-Array aus mainDB.js
console.log(movies);

const form = document.querySelector('form');
const movieOutput = document.getElementById('movieOutput');
const yearUpButton = document.getElementById('yearUp');
const yearDownButton = document.getElementById('yearDown');
const bestRateButton = document.getElementById('bestRate');

// Funktion zum Rendern der Filme
function renderMovies(movieArray) {
    movieOutput.innerHTML = '';
    movieArray.forEach(movie => {
        const [title, year, director, duration, genres, rating] = movie;

        // Überprüfe, ob das genres-Array vorhanden ist, bevor du darauf zugreifst
        const genresText = genres ? genres.join(', ') : 'N/A';

        const movieElement = document.createElement('div');
        movieElement.classList.add('movieOutput');

        movieElement.innerHTML = `
       <div class="outdiv1"> <span>📀📀📀📀📀📀</span>
        <h2 class="outDiv">${title}</h2>
            <p>Year: ${year}</p> 
            <h4>Director: ${director}</h4>
            <p>Duration: ${duration}</p>
            <p>Genres: ${genresText}</p>
            <p>Rating: ${rating}</p>
            <div class="outdiv3"><div class="outdiv2"><p class="outP">▶️</p></div></div>
        </div>



        `;

        movieOutput.appendChild(movieElement);
    });
}

// Initialer Aufruf, um alle Filme zu rendern
renderMovies(movies);

// Event-Listener für das Formular (Suche)
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = event.target[0].value.toLowerCase();

    // Filtere Filme nach dem Suchbegriff
    const filteredMovies = movies.filter(movie => {
        // Überprüfe, ob der Suchbegriff in irgendeinem Feld des Films enthalten ist
        return movie.some(field => {
            // Falls das Feld ein Array ist, überprüfe, ob der Suchbegriff darin enthalten ist
            if (Array.isArray(field)) {
                return field.some(value => value.toLowerCase().includes(searchTerm));
            }
            // Falls das Feld kein Array ist, überprüfe, ob der Suchbegriff darin enthalten ist
            return field.toString().toLowerCase().includes(searchTerm);
        });
    });

    // Rendere die gefilterten Filme
    renderMovies(filteredMovies);
});


// Event-Listener für die Sortier-Buttons
yearUpButton.addEventListener('click', function () {
    // Sortiere Filme nach aufsteigendem Jahr
    const sortedMovies = [...movies].sort((a, b) => a[1] - b[1]);
    renderMovies(sortedMovies);
});

yearDownButton.addEventListener('click', function () {
    // Sortiere Filme nach absteigendem Jahr
    const sortedMovies = [...movies].sort((a, b) => b[1] - a[1]);
    renderMovies(sortedMovies);
});

bestRateButton.addEventListener('click', function () {
    // Sortiere Filme nach bestem Rating
    const sortedMovies = [...movies].sort((a, b) => b[5] - a[5]);
    renderMovies(sortedMovies);
});

// Funktion zum Hinzufügen eines Films
function addMovie(title, year, director, duration, genres, rating) {
    // Erstelle ein neues Movie-Objekt
    const newMovie = [title, year, director, duration, genres, rating];

    // Füge den neuen Film zum movies-Array hinzu
    movies.push(newMovie);

    // Rendere die aktualisierte Liste der Filme
    renderMovies(movies);
}

// Funktion zum Löschen eines Films
function deleteMovie(index) {
    // Entferne den Film aus dem movies-Array anhand des Index
    movies.splice(index, 1);

    // Rendere die aktualisierte Liste der Filme
    renderMovies(movies);
}
// In main.js

// Function to open the Add Movie modal
function openAddMovieModal() {
    document.getElementById('addMovieModal').style.display = 'block';
}

// Function to close the Add Movie modal
function closeAddMovieModal() {
    document.getElementById('addMovieModal').style.display = 'none';
}

// Function to open the Delete Movie modal
function openDeleteMovieModal() {
    const deleteMovieModal = document.getElementById('deleteMovieModal');
    if (deleteMovieModal) {
        deleteMovieModal.style.display = 'block';
    }
}

// Function to close the Delete Movie modal
function closeDeleteMovieModal() {
    const deleteMovieModal = document.getElementById('deleteMovieModal');
    if (deleteMovieModal) {
        deleteMovieModal.style.display = 'none';
    }
}

// Event listeners for opening and closing modals
document.getElementById('btnAddMovie').addEventListener('click', openAddMovieModal);
document.getElementById('closeAddMovieModal').addEventListener('click', closeAddMovieModal);

document.getElementById('btnDeleteMovie').addEventListener('click', openDeleteMovieModal);
document.getElementById('closeDeleteMovieModal').addEventListener('click', closeDeleteMovieModal);

// In main.js

// Function to open a modal by ID
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a modal by ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners for opening and closing modals
document.getElementById('btnAddMovie').addEventListener('click', () => openModal('addMovieModal'));
document.getElementById('closeAddMovieModal').addEventListener('click', () => closeModal('addMovieModal'));

document.getElementById('btnDeleteMovie').addEventListener('click', () => openModal('deleteMovieModal'));
document.getElementById('closeDeleteMovieModal').addEventListener('click', () => closeModal('deleteMovieModal'));

// In main.js

// Event listener for the form submission in the add movie modal
document.getElementById('addMovieForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Sammle Informationen zum neuen Film
    const title = document.getElementById('title').value;
    const year = parseInt(document.getElementById('year').value);
    const director = document.getElementById('director').value;

    // Weitere Informationen nach Bedarf sammeln

    // Füge den neuen Film zum movies Array hinzu
    movies.push([title, year, director]);

    // Rufe die renderMovies Funktion auf, um die Aktualisierung anzuzeigen
    renderMovies(movies);

    // Schließe das Modal
    closeModal('addMovieModal');
});


