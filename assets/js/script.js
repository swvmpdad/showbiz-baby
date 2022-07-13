var movieListEl = document.getElementById("dropdown-menu");
var movieChoiceEl = document.getElementsByClassName("dropdown-item");
var ytTrailerEl = document.getElementById("trailer");
var metaCriticEl = "";
var fandangoEl = "";
var movies = {};
var zipCode = 77642;
var movieID = [];
var voteAverage = [];


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
    for (var i = 0; i < movies.results.length; i++) {
        if (movies.results[i].original_title === "ドラゴンボール超：スーパーヒーロー") {
            document.getElementById("movie" + i).textContent = "Dragon Ball Super: Super Hero";
        } else {
        console.log(movies.results[i].original_title);
        document.getElementById("movie" + i).textContent = movies.results[i].original_title;
        }
        movieID.push(movies.results[i].id) //This pulls the id from the movie information
        voteAverage.push(movies.results[i].vote_average) //This pulls the vote average
        console.log(voteAverage[i]);
    
    }
};

getmovieIntheater();

movieListEl.addEventListener("click", function(event) {
    var movie = event.target;
    var movieName = movie.innerHTML;
    document.getElementById("movie-name").innerHTML = "<h2 class='title'>" + movieName + "</h2>";
    var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + movieName + "&key=AIzaSyCSaF4JJUWWEQ-2uEHOdcLW4mVdu4LZtrQ";
    fetch(youtubeUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var videos = data;
                console.log(videos);
                videoId = videos.items[0].id.videoId;
                ytTrailerEl.innerHTML = '<iframe class="row" width="400" height="200" src="https://www.youtube.com/embed/' + videoId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            });
        }
    });
});