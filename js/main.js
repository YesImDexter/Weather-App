const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("button-search");
const darkLogo = document.getElementById("darkicon");

const root = document.documentElement;

document.getElementById("info").style.display = "none";
document.getElementById("prompt").style.display = "none";

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
    if (root.classList.contains("dark-theme")){
        darkicon.classList.remove("fa-moon");
        darkicon.classList.add("fa-sun");
      } else {
        darkicon.classList.remove("fa-sun");
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

  //LMAO IM TOO LAZY TO HIDE MY API KEY< PLEASE DONT STEAL IT
  const APIToken = process.env.API_KEY;

  const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+inputSearch.value+"&units=metric"+"&appid="+APIToken;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network Error");
      }

      //Parse JSON data
      return response.json();
    })
    .then(data => {
      console.log(data);

      document.getElementById("info").style.display = "flex";

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
    })
}
// 2.5/forecast?id=524901&appid={API key}