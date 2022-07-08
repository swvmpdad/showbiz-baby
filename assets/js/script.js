var movieListEl = document.getElementById("dropdown-menu");
var movieChoiceEl = document.getElementsByClassName("dropdown-item");
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
                movieList(movies);
            });
        }
    });
};

var movieList = function(movies) {
    console.log(movies);
    for (var i = 0; i < movies.results.length; i++) {
        console.log(movies.results[i].original_title);
        document.getElementById("movie" + i).textContent = movies.results[i].original_title;
    }
};

var setClickableOptions = function () {
    for (var i = 0; i < 20; i++) {
        var listOption = document.getElementById("movie" + i);
        document.getElementById("movie" + i).addEventListener("click", displayMovie(listOption));
    }
}
var displayMovie = function(movie) {
    console.log(movie);
};

// movieChoiceEl.addEventListener("click", displayMovie(this))

getmovieIntheater();
setClickableOptions();