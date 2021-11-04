const input = document.querySelector(".input-title");
const results = document.querySelector(".results");
const header = document.querySelector("#header");
const searhText = document.querySelector(".searhText");
const movieDetails = document.querySelector(".movie-details");
const detailsTitle = document.querySelector(".details-title");
const detailsReleaseDate = document.querySelector(".details-release_date");
const movieClose = document.querySelector(".movie-close");
const movieDetailsPoster = document.querySelector(".movie-details-poster");
const detailsBudget = document.querySelector(".details-budget");
const movieRevenue = document.querySelector(".movie-revenue");
const movieVoteAverage = document.querySelector(".movie-vote_average");
const movieGenres = document.querySelector(".movie-genres");
const movieStatus = document.querySelector(".movie-status");
const movieRuntime = document.querySelector(".movie-runtime");
const movieOverview = document.querySelector(".movie-overview");
const body = document.querySelector("body");

let movies;


// function for creating elements and adding classes
function createElement(elementType, elementInnerHTML, elementClass = null) {
  let element = document.createElement(elementType)
  element.classList.add(elementClass);
  element.innerHTML = elementInnerHTML;
  return (element);
}

input.addEventListener("keyup", () => {
  searhText.style.marginTop = "0px"
  searhText.style.marginBottom = "10px"
  results.innerHTML = '';
  if (input.value != '') {
    getMovies()
  } else {
    searhText.style.marginTop = "150px";
  }
})

// Async function for getting movies
async function getMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a9b7a0e2b3e6b79f09ed403cf5f174ac&query=${input.value}&include_adult=false&language=en-US`);
  if (!res.ok) {
    const messageErr = `An error has occured: ${res.status}`;
    results.append(createElement("p", messageErr, "message"));
  } else {
    const json = await res.json();
    const movies = await json.results;

    for (let i = 0; i < 12; i++) {
      if (movies[i] !== undefined) {

        //Create movie-box
        const movieBox = document.createElement('div');
        movieBox.classList.add("movie-box");

        // Create movie poster
        const pictureLink = document.createElement("img");
        if (movies[i].poster_path !== null) {
          pictureLink.style.backgroundImage = "url('" + `https://image.tmdb.org/t/p/original${movies[i].poster_path}` + "')";
        } else {
          // If poster is null
          pictureLink.style.backgroundImage = "url('./no image.jpg')";
        }
        pictureLink.classList.add("movie-picture");
        movieBox.appendChild(pictureLink);

        // create vote element
        if (movies[i].vote_average == 0) {
          movieBox.appendChild(createElement("p", '<img src="./star.png"> no rate', "vote"))
        } else {
          movieBox.appendChild(createElement("p", `<img src="./star.png"> ${movies[i].vote_average}`, "vote"))
        }

        //Create movie title
        const movieTitle = document.createElement("h1");
        movieTitle.innerHTML = movies[i].original_title;
        movieTitle.classList.add("movie-title");

        // Create, check and append movie year
        const movieYear = document.createElement("p");
        if (movies[i].release_date == undefined || movies[i].release_date == '') {
          movieYear.innerHTML = "-";
        } else {
          movieYear.innerHTML = movies[i].release_date.slice(0, 4);
        }

        // Appends
        movieBox.appendChild(movieTitle)
        movieBox.appendChild(movieYear)
        results.appendChild(movieBox);


        // NEW FETCH - fetch movie detais when movie is clicked

        // Movie details
        movieBox.addEventListener("click", function () {
          fetch(`https://api.themoviedb.org/3/movie/${movies[i].id}?api_key=a9b7a0e2b3e6b79f09ed403cf5f174ac`)
            .then(res => res.json())
            .then(data1 => {
              const details = data1;
              movieDetails.style.display = "block";

              // adding data to elements

              // TITLE
              detailsTitle.innerText = movies[i].original_title;

              // DATE
              if (movies[i].release_date == undefined || movies[i].release_date == '') {
                detailsReleaseDate.innerHTML = "-";
              } else {
                detailsReleaseDate.innerHTML = movies[i].release_date;
              }

              // RATING
              if (movies[i].vote_average == 0) {
                movieVoteAverage.innerHTML = "Rating: -";
              } else {
                movieVoteAverage.innerHTML = `Rating: ${movies[i].vote_average}`
              }

              // GENRES
              movieGenres.innerHTML = `Genres: ${details.genres[0].name}`;

              // POSTER
              const pictureLink1 = document.createElement("img");
              pictureLink1.style.backgroundImage = pictureLink.style.backgroundImage;
              pictureLink1.classList.add("movie-details-poster");
              movieDetailsPoster.appendChild(pictureLink1);

              // remove scroll
              body.classList.add('stop-scrolling');

              // Remove movie-details
              movieClose.addEventListener("click", () => {
                movieDetails.style.display = "none";
                pictureLink1.remove();

                // add scroll
                body.classList.remove('stop-scrolling')
              })

              // REVENUE
              if (details.revenue !== 0) {
                movieRevenue.innerHTML = `Revenue: ${details.revenue}`;
              } else {
                movieRevenue.innerHTML = 'Revenue: No data';
              }

              // BUDGET
              if (details.revenue !== 0) {
                detailsBudget.innerHTML = `Budget: ${details.budget}`;
              } else {
                detailsBudget.innerHTML = 'Budget: No data';
              }

              // STATUS
              movieStatus.innerHTML = `Status: ${details.status}`

              // RUNTIME
              if (details.runtime !== 0) {
                movieRuntime.innerHTML = `Runtime: ${details.runtime} minutes`;
              } else {
                movieRuntime.innerHTML = 'Runtime: No data';
              }

              // OVERVIEW
              movieOverview.innerHTML = details.overview;

            })
        })


      } else {
        if (json.total_results === 0) {
          results.append(createElement("p", `No results for "${input.value}"`, "message"));
        }
      }
    }
  }
}

