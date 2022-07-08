var movieListEl = document.getElementById("#movie-titles");
var ytTrailerEl = "";
var metaCriticEl = "";
var fandangoEl = "";
var movies = {};


var getmovieIntheater = function() {
    var tmdbGetMovieUrl = 
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f9a508cdd6b59974778c20fc10fe58da&language=en-US&page=1";
    fetch(tmdbGetMovieUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var movies = data;
                displayMovies(movies);
            });
        }
    });
};

var displayMovies = function(movies) {
    console.log(movies);
    for (var i = 0; i < movies.results.length; i++) {
        console.log(movies.results[i].original_title);
    }
};

getmovieIntheater();