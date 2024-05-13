const fetchMovieGenres = async () => {
    try {
        const API_KEY = 'YOUR_TMDB_API_KEY';
        const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

        const response = await fetch(GENRES_URL);
        const data = await response.json();

        if (data.genres.length === 0) {
            console.log('No genres found.');
            return {};
        }

        // Create a map of genre IDs to genre names
        const genreMap = {};
        for (const genre of data.genres) {
            genreMap[genre.id] = genre.name;
        }

        return genreMap;
    } catch (error) {
        console.error('Error fetching movie genres:', error);
        return {};
    }
};





export async function getMovieDetails(movieName){
    // const API_KEY = 'd2d81d21176485cd76c0bcb8a4124982';
    // const movieName = 'The Dark Knight';
    console.log(movieName)
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_IMDB_API_KEY}&query=${encodeURIComponent(movieName)}`;

    // Fetch movie details
    const response = await fetch(SEARCH_URL);
    const data = await response.json();

    // Check if any movies were found
    if (data.results.length === 0) {
      console.log('No movies found with that name.');
      return null
    }
    // console.log(data.results)
    // overview 
    // original_itile
    // vote_average
    // poster_path
    // genre
    let movieList = []

    // Display information for each movie found
    data.results.forEach(movie => {
        const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Adjust size as needed
        const imageURL = movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'No image available';
        const TMDB_BASE_URL = 'https://www.themoviedb.org/movie/';
        const tmdbURL = `${TMDB_BASE_URL}${movie.id}`;

        const data = {
            movieName: movie.original_title,
            movieDescription: movie.overview,
            movieRating:movie.vote_average,
            movieReleaseDate: movie.release_date,
            moviePosterUrl:imageURL,
            tmdbUrl:tmdbURL
        }
        movieList.push(data)
        // console.log('Movie:', movie.title);
        // console.log('Overview:', movie.overview);
        // console.log('Rating:', movie.vote_average);
        // console.log('Release Date:', movie.release_date);
  
        // Display genres
        // const genres = movie.genres.map(genre => genre.name).join(', ');
        console.log(movie);
        // Construct the public image URL (poster path)
       
        // console.log('Image URL:', imageURL);
  
        // console.log('-----------------------');
    });
    return movieList

}


// const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(MOVIE_NAME)}`;
    
// // Fetch movie details
// fetch(SEARCH_URL)
//   .then(response => response.json())
//   .then(data => {
//     // Get the first search result (assuming it's the correct movie)
//     const movie = data.results[0];
//     const movieId = movie.id;

//     // Fetch movie details by ID
//     const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
//     return fetch(MOVIE_DETAILS_URL);
//   })
//   .then(response => response.json())
//   .then(movieDetails => {
//     // Extract movie rating
//     const rating = movieDetails.vote_average;
//     console.log("Movie rating:", rating);
    
//     // Other details such as plot summary, cast, etc. are available in movieDetails object
//     // You can access them as needed
//   })
//   .catch(error => {
//     console.error('Error fetching movie details:', error);
//   });