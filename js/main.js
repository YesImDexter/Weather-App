const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("button-search");
const darkLogo = document.getElementById("darkicon");
const weatherico = document.getElementById("weather-icon")

const root = document.documentElement;

document.getElementById("info").style.display = "none";
document.getElementById("prompt").style.display = "none";

const infoContainer = document.getElementById("info");

//Get the toggle button
const toggle = document.getElementById("toggle");

// Get the user's preference from localStorage
const darkMode = localStorage.getItem("dark-mode");

// Check if the user has already chosen a theme
if (darkMode) {
  // If yes, apply it to the root element
  root.classList.add("dark-theme");
  changeIcon();
}
// Add an event listener to the toggle button
toggle.addEventListener("click", () => {
  // Toggle the dark-theme class on the root element
  root.classList.toggle("dark-theme");
  changeIcon();

  // Store or remove the user's preference in localStorage
  if (root.classList.contains("dark-theme")) {
    localStorage.setItem("dark-mode", true);
  } else {
    localStorage.removeItem("dark-mode");
  }
});

function changeIcon() {
  if (root.classList.contains("dark-theme")) {
    darkicon.classList.remove("fa-moon");
    darkicon.classList.add("fa-eye");
  } else {
    darkicon.classList.remove("fa-eye");
    darkicon.classList.add("fa-moon");
  }
}

// Function to handle "Enter" key press
inputSearch.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    // Call getWeather() function when "Enter" key is pressed
    getWeather();
  }
});

// Function to get weather data
function getWeather() {

  document.getElementById("info").style.display = "none";
  document.getElementById("prompt").style.display = "none";

  //LMAO IM TOO LAZY TO HIDE MY API KEY >w< PLEASE DONT STEAL IT
  const APIToken = "5b6ddf2fc7a4a520ef84c3317aaf5e1c";

  const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputSearch.value + "&units=metric" + "&appid=" + APIToken;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network Error");
      }

      //Parse JSON data
      return response.json();
    })
    .then(data => {

      infoContainer.style.display = "flex";
      setTimeout(100);
      infoContainer.classList.add("animate__fadeInUp");

      switch (data.weather[0].main) {
        case "Clear":
          weatherico.src = "src/Clear.png"
          break;
        case "Clouds":
          weatherico.src = "src/Clouds.png"
          break;
        case "Drizzle":
          weatherico.src = "src/Drizzle.png"
          break;
        case "Mist":
          weatherico.src = "src/Mist.png"
          break;
        case "Rain":
          weatherico.src = "src/Rain.png"
          break;
        case "Snow":
          weatherico.src = "src/Snow.png"
          break;
      }

      //clear, clouds, drizzle, mist, rain, snow

      document.getElementById("name").innerText = data.name;
      document.getElementById("temp").innerText = data.main.temp;
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("wind").innerText = data.wind.speed;
      document.getElementById("desc").innerText = data.weather[0].description;
      document.getElementById("weather").innerText = data.weather[0].main;
    })
    .catch(error => {
      //Handle Errors
      console.error("There was a problem with the fetch operation");

      document.getElementById("prompt").style.display = "flex";
      setTimeout(100);
      document.getElementById("prompt").classList.add("animate__bounceIn");
    })
}