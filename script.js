document.addEventListener("DOMContentLoaded", () => {
  const singleDogButton = document.getElementById("dog-button");

  const singleDogContainer = document.getElementById("dog-output");

  async function getSingleDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    singleDogContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = data.message;

    singleDogContainer.appendChild(img);
  }

  singleDogButton.addEventListener("click", getSingleDogImage);
});

document.addEventListener("DOMContentLoaded", () => {
  const singleCatButton = document.getElementById("cat-button");

  const singleCatContainer = document.getElementById("cat-output");

  async function getSingleCatImage() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    singleCatContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = data[0].url;

    singleCatContainer.appendChild(img);
  }

  singleCatButton.addEventListener("click", getSingleCatImage);
});

const weatherBtn = document.getElementById("weatherBtn");
const weatherOutput = document.getElementById("weather-output");

async function getWeather() {
  const city = "New York";

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=40.73061&longitude=-73.935242&hourly=temperature_2m&models=gfs_seamless&current=temperature_2m,is_day,precipitation,wind_speed_10m,wind_direction_10m&forecast_days=1&temperature_unit=fahrenheit";

  try {
    weatherOutput.textContent = "Loading...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    weatherOutput.innerHTML = `
      <p><strong>Weather in ${city}</strong></p>
      <p>Temperature: ${data.current.temperature_2m} °F</p>
      <p>Precipitation: ${data.current.precipitation} mm</p>
      <p>Wind Speed: ${data.current.wind_speed_10m} km/h</p>
      <p>Wind Direction: ${data.current.wind_direction_10m}°</p>
    `;
  } catch (error) {
    weatherOutput.textContent = `Error: ${error.message}`;
  }
}

weatherBtn.addEventListener("click", getWeather);

const currencyBtn = document.getElementById("currencyBtn");
const currencyOutput = document.getElementById("currency-output");

async function getCurrency() {
  const url =
    "https://v6.exchangerate-api.com/v6/96a8cf2f4e0321d7be9943a7/latest/USD";

  try {
    currencyOutput.textContent = "Loading...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    currencyOutput.innerHTML = `
      <p><strong>Exchange Rates (Base: USD)</strong></p>
      <p>EUR: ${data.conversion_rates.EUR}</p>
      <p>GBP: ${data.conversion_rates.GBP}</p>
      <p>JPY: ${data.conversion_rates.JPY}</p>
      <p>AUD: ${data.conversion_rates.AUD}</p>
    `;
  } catch (error) {
    currencyOutput.textContent = `Error: ${error.message}`;
  }
}

currencyBtn.addEventListener("click", getCurrency);

const movieBtn = document.getElementById("movieBtn");
const movieOutput = document.getElementById("movie-output");

const apiKey = "1ebbf25601c1f4c2924a91d729a21f18";

async function getMovies() {
  try {
    movieOutput.textContent = "Loading...";
    movieBtn.disabled = true;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    const movies = data.results.slice(0, 6);

    movieOutput.innerHTML = movies
      .map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "";

        return `
          <div class="movie">
            ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" />` : ""}
            <p><strong>${movie.title}</strong></p>
            <p>⭐ ${movie.vote_average}</p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    movieOutput.textContent = `Error: ${error.message}`;
  } finally {
    movieBtn.disabled = false;
  }
}

movieBtn.addEventListener("click", getMovies);

const githubBtn = document.getElementById("githubBtn");
const githubOutput = document.getElementById("github-output");

async function getGithubData() {
  try {
    githubOutput.textContent = "Loading...";

    const response = await fetch("https://api.github.com/users/darwin2342");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    githubOutput.innerHTML = `
      <p><strong>GitHub User: ${data.login}</strong></p>
      <p>Name: ${data.name}</p>
      <p>Public Repositories: ${data.public_repos}</p>
      <p>Followers: ${data.followers}</p>
    `;
  } catch (error) {
    githubOutput.textContent = `Error: ${error.message}`;
  }
}

githubBtn.addEventListener("click", getGithubData);

const jokeBtn = document.getElementById("jokeBtn");
const jokeOutput = document.getElementById("joke-output");

async function getJoke() {
  try {
    jokeOutput.textContent = "Loading...";

    const response = await fetch("https://v2.jokeapi.dev/joke/Any");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.type === "single") {
      jokeOutput.textContent = data.joke;
    } else {
      jokeOutput.innerHTML = `
        <p>${data.setup}</p>
        <p><em>${data.delivery}</em></p>
      `;
    }
  } catch (error) {
    jokeOutput.textContent = `Error: ${error.message}`;
  }
}

jokeBtn.addEventListener("click", getJoke);

const publicApiBtn = document.getElementById("publicApiBtn");
const publicApiOutput = document.getElementById("publicapi-output");

const stockMarketKey = "1395d7e4889f3c898a2c83b3d3efdf59";

const stockMarketUrl = `http://api.marketstack.com/v2/tickers/spy/eod?access_key=${stockMarketKey}`;

async function getPublicApiInfo() {
  const url = `https://api.marketstack.com/v1/eod/latest?access_key=${stockMarketKey}&symbols=SPY`;

  try {
    publicApiOutput.textContent = "Loading...";
    publicApiBtn.disabled = true;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // Marketstack returns an array inside data.data
    const stock = data.data?.[0];

    if (!stock) {
      throw new Error("No stock data returned.");
    }

    publicApiOutput.innerHTML = `
      <p><strong>Stock: ${stock.symbol}</strong></p>
      <p>Date: ${stock.date}</p>
      <p>Open: $${stock.open}</p>
      <p>Close: $${stock.close}</p>
      <p>High: $${stock.high}</p>
      <p>Low: $${stock.low}</p>
    `;
  } catch (error) {
    publicApiOutput.textContent = `Error: ${error.message}`;
    console.log(error);
  } finally {
    publicApiBtn.disabled = false;
  }
}

publicApiBtn.addEventListener("click", getPublicApiInfo);
