//take input from user
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
  //alert("i was clicked");

  const location = searchInput.value;
  // call API
  fetchweather(location).then((data) => {
    console.log("data is... //", data);

    //UPDATE DOM
    updateDOM(data);
  });

  searchInput.value = " ";
});
async function fetchweather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=03484fb3538b406188365203262301&q=${location}&aqi=no`;

  const response = await fetch(url);
  // console.log(response);

  // ERROR HANDLING
  if (response.status == 400) {
    return error;
  } else {
    const jsonData = await response.json();
    //console.log(jsonData);
    return jsonData;
  }
}

function updateDOM(data) {
  // ---- 1. Filter required data ---- //

  const temp = data.current.temp_c;
  const location = data.location.name;

  const timedata = data.location.localtime; 
  const [date, time] = timedata.split(" ");

  const condition = data.current.condition.text;
  const iconUrl = data.current.condition.icon;

  const day = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  // ---- 2. Select DOM elements ---- //

  const temperatureEl = document.querySelector(".temperature");
  const locationEl = document.querySelector(".location");
  const timeEl = document.querySelector(".time");
  const dayEl = document.querySelector(".day");
  const dateEl = document.querySelector(".date");
  const conditionEl = document.querySelector(".condition");
  const iconImg = document.querySelector(".icon img");

  // ---- 3. Update DOM ---- //

  temperatureEl.textContent = temp + "°C";
  locationEl.textContent = location;
  timeEl.textContent = time;
  dayEl.textContent = day;
  dateEl.textContent = date;
  conditionEl.textContent = condition;
  iconImg.src = "https:" + iconUrl;
}