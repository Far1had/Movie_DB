// Zugriff auf das movies-Array aus mainDB.js
console.log(movies);

const form = document.querySelector('form');
const movieOutput = document.getElementById('movieOutput');
const yearUpButton = document.getElementById('yearUp');
const yearDownButton = document.getElementById('yearDown');
const bestRateButton = document.getElementById('bestRate');

// Funktion zum Rendern der Filme
function renderMovies(movieArray) {
    movieOutput.innerHTML = '';       // Leere den aktuellen Inhalt//
    movieArray.forEach(movie => {
        const [title, year, director, duration, genres, rating] = movie;    // Iteriere durch den Film-Array und erstelle für jeden Film ein HTML-Element

        // Erstelle div für das ausgabe Movie-Element
        const movieElement = document.createElement('div');
        movieElement.classList.add('movieOutput');

        // Fülle das Element mit Informationen
        movieElement.innerHTML = `
            <h2>${title}</h2>
            <p>Year: ${year}</p> 
            <h4>Director: ${director}</h4>
            <p>Duration: ${duration}</p>
            <p>Genres: ${genres.join(', ')}</p>
            <p>Rating: ${rating}</p>
        `;

        // Füge das Movie-Element zum Movie Output Container hinzu
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



