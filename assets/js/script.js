var movieListEl = document.getElementById("dropdown-menu");
var movieChoiceEl = document.getElementsByClassName("dropdown-item");
var ytTrailerEl = "";
var metaCriticEl = "";
var fandangoEl = "";
var movies = {};
var zipCode = 77642;


var getmovieIntheater = function() {
    var tmdbGetMovieUrl = 
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f9a508cdd6b59974778c20fc10fe58da&language=en-US&page=1";
    fetch(tmdbGetMovieUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var movies = data;
                movieList(movies);
                console.log(movies);
            });
        }
    });
};

var movieList = function(movies) {
    for (var i = 0; i < movies.results.length; i++) {
        console.log(movies.results[i].original_title);
        document.getElementById("movie" + i).textContent = movies.results[i].original_title;
    }
};

getmovieIntheater();

movieListEl.addEventListener("click", function(event) {
    var movie = event.target;
    var movieName = movie.innerHTML;
    document.getElementById("movie-name").innerHTML = "<h2 class='title'>" + movieName + "</h2>";
    var youtubeUrl = "https://www.googleapis.com/youtube/v3/search"
});