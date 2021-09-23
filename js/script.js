const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = '764e2ea637804a00e1ba9208485386e5';
const imagePath = 'https://image.tmdb.org/t/p/w200';
// let movieDate;
// let movieData;
// let posterPath;
// let html = [];

// Cached Elemnts Refernces
const $main = $('main');
const $form = $('form');
const $input = $('input[type="date"]');

// Event Listeners
$form.on('submit', handleGetData)

// Functions
function handleGetData(event) {
    event.preventDefault();
    const movieDate = $input.val();
    if (!movieDate) return;
    $input.val("");

    $.ajax('https://api.themoviedb.org/3/discover/movie?api_key=764e2ea637804a00e1ba9208485386e5&language=en-US&sort_by=vote_count.desc&page=1&primary_release_date.gte='+ movieDate +'&primary_release_date.lte='+ movieDate +'&vote_count.gte=5').then(function(data) {
        movieData = data;
        if (movieData.total_results === 0) { alert("No movies released on this date!") }
        render();
    }, function (error) {
        console.log(error);
    });
}

function render() { 
    const html = movieData.results.map(function(movies) {
        $('#front').remove();
        return `<article>
                    <p id='poster'><img src=${imagePath}${movies.poster_path}></p>
                    <h2>${movies.original_title}</h2>
                    <p id="release">${movies.release_date}</p>
                    <p>${movies.overview}</p>
                </article>`;
    });
    $main.html(html);
}

