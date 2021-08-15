// Details of movie

fetch("https://imdb8.p.rapidapi.com/title/get-plots?tconst=tt0137523", {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "38c5c8ea22msh322a98a06850ed3p19c289jsna2cd20d9bf04",
    "x-rapidapi-host": "imdb8.p.rapidapi.com"
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data.plots[0].text)
    console.log(data.plots[1].text)
    console.log(data.plots[2].text)
    console.log(data.plots[3].text)
    console.log(data.plots[4].text)
    for (plot in data.plots) {
      console.log(plot)
    }



  }
  )
  .catch(err => {
    console.error(err);
  });