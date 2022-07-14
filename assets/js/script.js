var movieListEl = document.getElementById("dropdown-menu");
var movieChoiceEl = document.getElementsByClassName("dropdown-item");
var ytTrailerEl = document.getElementById("trailer");
var returnedMoviesName = [];
var returnedMoviesAverage = [];
var returnedMovieOverview = [];
var reviewTitleEl = document.getElementById("review-title");

var getmovieIntheater = function() { //function to get the list of movies currently playing
    var tmdbGetMovieUrl = 
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f9a508cdd6b59974778c20fc10fe58da&language=en-US&page=1";
    fetch(tmdbGetMovieUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var movies = data;
                movieNameNew(movies, returnedMoviesName);
                // movieOverView(movies, returnedMovieOverview);
                movieAverage(movies, returnedMoviesAverage);
                movieList(movies); //sending the list to the dropdown menu function
                console.log(movies);
            });
        }
    });
};

var movieList = function(movies) { // adds the names of the movies to the dropdown menu
    for (var i = 0; i < movies.results.length; i++) {
        if (movies.results[i].original_title === "ドラゴンボール超：スーパーヒーロー") {
            document.getElementById("movie" + i).textContent = "Dragon Ball Super: Super Hero"; // had to create an if statement for Dragon Ball Super: Superhero
        } else {
            document.getElementById("movie" + i).textContent = movies.results[i].original_title;
        } 
    }
};

// var movieOverView = function(movies, overView){
//     for (var i = 0; i < movies.results.length; i++) {
//         overView.push(movies.results[i].overview); //Pulls overview
//     };
// };

var movieNameNew = function(movies, movieNameNewList){
    for (var i = 0; i < movies.results.length; i++) {
        if (movies.results[i].original_title === "ドラゴンボール超：スーパーヒーロー") {
            movieNameNewList.push("Dragon Ball Super: Super Hero")
        } else {
            movieNameNewList.push(movies.results[i].original_title)
        }
    };
};

var movieAverage = function(movies, voteAverage){
    for (var i = 0; i < movies.results.length; i++) {
        voteAverage.push(movies.results[i].vote_average) //This pulls the vote average
    };
}

getmovieIntheater();

movieListEl.addEventListener("click", function(event) { // the event listener for when one of the movies is selected
    var movie = event.target;
    // console.log(movie);
    indexNumber =returnedMoviesName.indexOf(movie.innerHTML);
    var movieName = movie.innerHTML;
    document.getElementById("movie-name").innerHTML = "<h2 class='title'>" + movieName + "</h2>";
    document.getElementById("movie-ratings-h2").innerHTML = "RATING: " + returnedMoviesAverage[indexNumber];
    // document.getElementById("movie-overview-h2").innerHTML = "SYNOPSIS: " + returnedMovieOverview[indexNumber];
    var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + movieName + "&key=AIzaSyCSaF4JJUWWEQ-2uEHOdcLW4mVdu4LZtrQ";
    fetch(youtubeUrl).then(function(response) { // function to fetch and display the youtube video
        if (response.ok) {
            response.json().then(function(data) {
                var videos = data;
                console.log(videos);
                videoId = videos.items[0].id.videoId;
                ytTrailerEl.innerHTML = '<iframe class="is-align-content-center" width="400" height="200" src="https://www.youtube.com/embed/' + videoId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            });
        }
    });
    var tmdbGetMovieUrl = 
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f9a508cdd6b59974778c20fc10fe58da&language=en-US&page=1";
    fetch(tmdbGetMovieUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var movies = data;
                for (var i = 0; i < movies.results.length; i++) { // function to display the movie overview
                    if (movieName === "Dragon Ball Super: Super Hero") {
                        document.getElementById("movie-desc").textContent = "The Red Ribbon Army, an evil organization that was once destroyed by Goku in the past, has been reformed by a group of people who have created new and mightier Androids, Gamma 1 and Gamma 2, and seek vengeance against Goku and his family.";
                    }
                    else if (movieName === movies.results[i].original_title) {
                        document.getElementById("movie-desc").textContent = movies.results[i].overview;
                        var movieId = movies.results[i].id;
                        reviewUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/reviews?api_key=f9a508cdd6b59974778c20fc10fe58da&language=en-US&page=1";
                        fetch(reviewUrl).then(function(response) { // function using the movie id to get reviews of the film
                            if (response.ok) {
                                response.json().then(function(data) { // function to display the author and the review
                                    var movie = data;
                                    console.log(movie);
                                    reviewTitleEl.textContent = "Movie Reviews"
                                    document.getElementById("reviewer0").textContent = ""; // resetting the elements in case of fewer than 4 reviews
                                    document.getElementById("reviewer1").textContent = "";
                                    document.getElementById("reviewer2").textContent = "";
                                    document.getElementById("reviewer3").textContent = "";
                                    document.getElementById("reviews0").textContent = "";
                                    document.getElementById("reviews1").textContent = "";
                                    document.getElementById("reviews2").textContent = "";
                                    document.getElementById("reviews3").textContent = "";
                                    for (var i = 0; i < movie.results.length; i++) {
                                        var reviewerEl = document.getElementById("reviewer" + i);
                                        var reviewsEl = document.getElementById("reviews" + i);  
                                        var reviewer = movie.results[i].author;  
                                        var review = movie.results[i].content;
                                        reviewerEl.innerHTML = reviewer;
                                        reviewsEl.innerHTML = review;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});