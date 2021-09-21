const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = '764e2ea637804a00e1ba9208485386e5';
const imagePath = 'https://image.tmdb.org/t/p/w200';
let movieDate;

const $form = $('form');
const $input = $('input[type="date"]');
const $poster = $('#poster')
const $title = $('#title')
const $release = $('#release')
const $overview = $('#overview')

$form.on('submit', handleGetData)

function handleGetData(event) {
    event.preventDefault();
    const movieDate = $input.val();
    if (!movieDate) return;
    $input.val("");

    $.ajax('https://api.themoviedb.org/3/discover/movie?api_key=764e2ea637804a00e1ba9208485386e5&language=en-US&sort_by=vote_count.desc&page=1&primary_release_date.gte='+ movieDate +'&primary_release_date.lte='+ movieDate +'&vote_count.gte=5').then(function(data) {
        const posterPath = (data.results[0].poster_path);
        $poster.append(`<img src=${imagePath}${posterPath} />`);
        $title.append(data.results[0].original_title);
        $release.append(data.results[0].release_date);
        $overview.append(data.results[0].overview);


    }, function (error) {

        console.log(error);
    });
    
}