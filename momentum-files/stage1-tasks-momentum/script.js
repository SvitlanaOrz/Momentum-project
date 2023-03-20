import playList from "./playList.js";

let greetingText = document.querySelector(".greeting");
let randomNum;
const date = new Date();
const hours = date.getHours();
const time = document.querySelector(".time");
const dateSelector = document.querySelector(".date");
const inputName = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherEror = document.querySelector(".weather-error");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const change_quote = document.querySelector(".change-quote");
//audio
let isPlay = false;
const play = document.querySelector(".play");
const audio = new Audio();
const playPrevButton = document.querySelector(".play-prev");
const playNextButton = document.querySelector(".play-next");
let playNum = 0;
let language = "en";
let backgroundSourse = "gitHub";
let tags = "nature";

let placeholderId = document.querySelector("#placeholderId");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting(language);
  setTimeout(showTime, 1000);
}

function showDate() {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDateEn = date.toLocaleDateString("en-US", options);
  const currentDateRu = date.toLocaleDateString("ru-RU", options);

  if (language === "en") {
    dateSelector.textContent = currentDateEn;
  } else {
    dateSelector.textContent = currentDateRu;
  }
}

function getTimeOfDayEn() {
  if (hours / 6 < 1) {
    return "night";
  } else if (hours / 6 < 2) {
    return "morning";
  } else if (hours / 6 < 3) {
    return "afternoon";
  } else if (hours / 6 < 4) {
    return "evening";
  }
}
function getTimeOfDayRu() {
  if (hours / 6 < 1) {
    return "Доброй ночи";
  } else if (hours / 6 < 2) {
    return "Доброе утро";
  } else if (hours / 6 < 3) {
    return "Добрый день";
  } else if (hours / 6 < 4) {
    return "Добрый вечер";
  }
}

function showGreeting() {
  const timeOfDayEn = getTimeOfDayEn();
  const timeOfDayRu = getTimeOfDayRu();

  if (language === "en") {
    greetingText.textContent = `Good ${timeOfDayEn},`;
    placeholderId.removeAttribute("placeholder");
    placeholderId.setAttribute("placeholder", `[Enter name]`);
  } else {
    greetingText.textContent = timeOfDayRu;
    placeholderId.removeAttribute("placeholder");
    placeholderId.setAttribute("placeholder", `[Введите имя]`);
  }
}

function setLocalStorage() {
  localStorage.setItem("name", inputName.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("language", language);
  localStorage.setItem("time", time.className);
  localStorage.setItem("dateSelector", dateSelector.className);
  localStorage.setItem("greetingContainer", greetingContainer.className);
  localStorage.setItem("quoteBlock", quoteBlock.className);
  localStorage.setItem("weather", weather.className);
  localStorage.setItem("playerBlock", playerBlock.className);
  localStorage.setItem("toDoBlockText", toDoBlockText.className);
  localStorage.setItem("todoItemsList", todoItemsList.innerHTML);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    inputName.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  if (localStorage.getItem("language")) {
    language = localStorage.getItem("language");
  }
  if (localStorage.getItem("time")) {
    time.className = localStorage.getItem("time");
  }
  if (localStorage.getItem("dateSelector")) {
    dateSelector.className = localStorage.getItem("dateSelector");
  }
  if (localStorage.getItem("greetingContainer")) {
    greetingContainer.className = localStorage.getItem("greetingContainer");
  }
  if (localStorage.getItem("quoteBlock")) {
    quoteBlock.className = localStorage.getItem("quoteBlock");
  }
  if (localStorage.getItem("weather")) {
    weather.className = localStorage.getItem("weather");
  }
  if (localStorage.getItem("playerBlock")) {
    playerBlock.className = localStorage.getItem("playerBlock");
  }
  if (localStorage.getItem("toDoBlockText")) {
    toDoBlockText.className = localStorage.getItem("toDoBlockText");
  }
  if (localStorage.getItem("todoItemsList")) {
    todoItemsList.innerHTML = localStorage.getItem("todoItemsList");
  }

  getWeather(city.value);
  getQuotes();
  translateSettings();

  if (language === "ru") {
    buttonLanguageEn.removeAttribute("checked");
    buttonLanguageRu.setAttribute("checked", "");
  }
  if (time.className.includes("hide-block")) {
    buttonTimeYes.removeAttribute("checked");
    buttonTimeNo.setAttribute("checked", "");
  }
  if (dateSelector.className.includes("hide-block")) {
    buttonDateYes.removeAttribute("checked");
    buttonDateNo.setAttribute("checked", "");
  }
  if (greetingContainer.className.includes("hide-block")) {
    buttonGreetingYes.removeAttribute("checked");
    buttonGreetingeNo.setAttribute("checked", "");
  }
  if (quoteBlock.className.includes("hide-block")) {
    buttonQuoteYes.removeAttribute("checked");
    buttonQuoteNo.setAttribute("checked", "");
  }
  if (weather.className.includes("hide-block")) {
    buttonWeatherYes.removeAttribute("checked");
    buttonWeatherNo.setAttribute("checked", "");
  }
  if (playerBlock.className.includes("hide-block")) {
    buttonAudioYes.removeAttribute("checked");
    buttonAudioNo.setAttribute("checked", "");
  }
  if (toDoBlockText.className.includes("hide-block")) {
    buttonTodolistYes.removeAttribute("checked");
    buttonTodolistNo.setAttribute("checked", "");
  }

  let deleteIcon = document.querySelectorAll(".fa-delete-left");
  deleteIcon.forEach((a) => a.addEventListener("click", deleteToDoItem));
}

window.addEventListener("load", getLocalStorage);

function getRandomNum() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBgGitHub() {
  const img = new Image();
  let timeOfDay = getTimeOfDayEn();
  let bgNum;
  if (randomNum < 10) {
    bgNum = "0" + randomNum;
  } else {
    bgNum = randomNum;
  }
  img.src = `https://raw.githubusercontent.com/SvitlanaOrz/momentum-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

async function setBgUnsplash() {
  const img = new Image();
  let apiKey = "ztNO4f8ThiiNaNx0ZzfPSfbXZBHrNTyRGKpa9ADwoVU";

  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

async function setBgFlickr() {
  const img = new Image();
  let apiKey = "6cbeeedfc7409039f9d946c93e2986a0";

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[0].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum = randomNum + 1;
  }
  if (backgroundSourse === "gitHub") {
    setBgGitHub();
  } else if (backgroundSourse === "unsplash") {
    setBgUnsplash();
  } else {
    setBgFlickr();
  }
}
slideNext.addEventListener("click", getSlideNext);

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum = randomNum - 1;
  }

  if (backgroundSourse === "gitHub") {
    setBgGitHub();
  } else if (backgroundSourse === "unsplash") {
    setBgUnsplash();
  } else {
    setBgFlickr();
  }
}
slidePrev.addEventListener("click", getSlidePrev);

async function getWeather() {
  if (city.value === "") {
    if (language === "en") {
      city.value = `Minsk`;
    } else {
      city.value = `Минск`;
    }
  }

  let apiKey = `c259514696bc9a77b1e48b8b8850f19a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=${apiKey}&units=metric`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  if (data.cod === "404") {
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    if (language === "en") {
      weatherEror.textContent = `Error! city not found for "${city.value}"!`;
    } else {
      weatherEror.textContent = `Ошибка! Город "${city.value}" не найден!`;
    }
  } else {
    weatherEror.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    if (language === "en") {
      weatherDescription.textContent = data.weather[0].main;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
    } else {
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Вологість: ${data.main.humidity} %`;
    }
  }
}

city.addEventListener("change", getWeather);

function changeRandomNam() {
  if (randomNum === 19) {
    randomNum = 1;
  } else {
    randomNum = randomNum + 1;
  }
  getQuotes();
}

async function getQuotes() {
  const quotesEn = "data.json";
  const resEn = await fetch(quotesEn);
  const dataEn = await resEn.json();

  const quotesRu = "dataRu.json";
  const resRu = await fetch(quotesRu);
  const dataRu = await resRu.json();

  if (language === "en") {
    quote.textContent = dataEn[randomNum].text;
    author.textContent = dataEn[randomNum].author;
  } else {
    quote.textContent = dataRu[randomNum].text;
    author.textContent = dataRu[randomNum].author;
  }
}
change_quote.addEventListener("click", changeRandomNam);

//audio player
const playListContainer = document.querySelector(".play-list");

playList.forEach((el) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = el.title;
  playListContainer.append(li);
  li.insertAdjacentHTML(
    "afterbegin",
    `<i class="fa-solid fa-play icon-play-music"></i>`
  );
});

let playItem = document.querySelectorAll(".play-item");
let trackName = document.querySelector(".track-name");
trackName.innerHTML = "1. " + playList[0].title;

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum = playNum - 1;
  }
  isPlay = false;

  playAudio();
}

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum = playNum + 1;
  }
  isPlay = false;

  playAudio();
}

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add("pause");

    playItem.forEach((el) => {
      el.classList.remove("item-active");
    });

    trackName.innerHTML = playNum + 1 + ". " + playList[playNum].title;
    playItem[playNum].classList.add("item-active");

    iconPlayMusic.forEach((el) => {
      el.classList.remove("item-active");
    });

    iconPlayMusic[playNum].classList.toggle("item-active");
  } else {
    isPlay = false;
    audio.pause();
    play.classList.remove("pause");
  }
}

play.addEventListener("click", playAudio);
playPrevButton.addEventListener("click", playPrev);
playNextButton.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);
// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
const progressBar = document.querySelector(".progress-bar");

function updateProgressValue() {
  let durationTime = document.querySelector(".duration-time");
  let currentTimeSong = document.querySelector(".current-time");
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;

  currentTimeSong.innerHTML = formatTime(Math.floor(audio.currentTime));

  if (formatTime(Math.floor(audio.duration)) === "NaN:NaN") {
    durationTime.innerHTML = "0:00";
  } else {
    durationTime.innerHTML = formatTime(Math.floor(audio.duration));
  }
}

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
  audio.currentTime = progressBar.value;
}

progressBar.addEventListener("change", changeProgressBar);

setInterval(updateProgressValue, 500);

const iconVolume = document.querySelector(".ic");
const valumeRange = document.querySelector(".volume-range");
let volumeOn = true;

function turnOnOffVolume() {
  // iconVolume.classList.toggle("oppacity");
  if (volumeOn) {
    iconVolume.classList.add("oppacity");
    volumeOn = false;
    valumeRange.value = 0;
    audio.volume = valumeRange.value / 100;
  } else {
    iconVolume.classList.remove("oppacity");
    volumeOn = true;
    valumeRange.value = 50;
    audio.volume = valumeRange.value / 100;
  }
}

iconVolume.addEventListener("click", turnOnOffVolume);

function changeVolumeBar() {
  audio.volume = valumeRange.value / 100;

  if (iconVolume.className.includes("oppacity")) {
    iconVolume.classList.remove("oppacity");
  }
}

valumeRange.addEventListener("click", changeVolumeBar);

//ДОРОБИТИ
function playIcon(event) {
  if (event.target.offsetParent.innerText === "Aqua Caelestis") {
    playNum = 0;
  } else if (event.target.offsetParent.innerText === "Ennio Morricone") {
    playNum = 1;
  } else if (event.target.offsetParent.innerText === "River Flows In You") {
    playNum = 2;
  } else {
    playNum = 3;
  }
  playAudio();
}

let iconPlayMusic = document.querySelectorAll(".icon-play-music");

iconPlayMusic.forEach((elem, index) => {
  elem.addEventListener("click", playIcon);
});

//переключення мови
let buttonLanguageEn = document.querySelector("#button__language__en");
let buttonLanguageRu = document.querySelector("#button__language__ru");
let settingsLanguageText = document.querySelector("#settings__language__text");
let settingsImageText = document.querySelector("#settings__image__text");
let settingsApiText = document.querySelector("#settings__api__text");
let settingsTimeText = document.querySelector("#settings__time__text");
let settingsDateText = document.querySelector("#settings__date__text");
let settingsGreetingText = document.querySelector("#settings__greeting__text");

let settingsQuoteText = document.querySelector("#settings__quote__text");
let settingsWeatherText = document.querySelector("#settings__weather__text");
let settingsAudioText = document.querySelector("#settings__audio__text");
let settingsTodolistText = document.querySelector("#settings__todolist__text");
let gitHubSource = document.querySelector("#gitHub__source");
let unsplashSource = document.querySelector("#unsplash__source");
let flickrSource = document.querySelector("#flickr__source");
let en = document.querySelector("#en");
let ru = document.querySelector("#ru");
let yes = document.querySelectorAll(".yes");
let no = document.querySelectorAll(".no");

function changeLangEn() {
  language = "en";
  getWeather();
  getQuotes();
  translateSettings();
  setLocalStorage();
}
function changeLangRu() {
  language = "ru";
  getWeather();
  getQuotes();
  translateSettings();
  setLocalStorage();
}

function translateSettings() {
  if (language === "en") {
    settingsLanguageText.innerHTML = "Language:";
    settingsImageText.innerHTML = "Image:";
    settingsApiText.innerHTML = "Api teg:";
    settingsTimeText.innerHTML = "Time:";
    settingsDateText.innerHTML = "Date:";
    settingsGreetingText.innerHTML = "Greeting:";
    settingsQuoteText.innerHTML = "Quote:";
    settingsWeatherText.innerHTML = "Weather:";
    settingsAudioText.innerHTML = "Audio:";
    settingsTodolistText.innerHTML = "Todolist:";
    en.innerHTML = "en";
    ru.innerHTML = "ru";
    gitHubSource.innerHTML = "GitHub";
    unsplashSource.innerHTML = "Unsplash";
    flickrSource.innerHTML = "Flickr";

    yes.forEach((a) => {
      a.innerHTML = "yes";
    });
    no.forEach((a) => {
      a.innerHTML = "no";
    });
  } else {
    settingsLanguageText.innerHTML = "Язык:";
    settingsImageText.innerHTML = "Изображения:";
    settingsApiText.innerHTML = "Тег для Апи:";
    settingsTimeText.innerHTML = "Время:";
    settingsDateText.innerHTML = "Дата:";
    settingsGreetingText.innerHTML = "Приветствие:";
    settingsQuoteText.innerHTML = "Цитаты:";
    settingsWeatherText.innerHTML = "Погода:";
    settingsAudioText.innerHTML = "Аудио:";
    settingsTodolistText.innerHTML = "Список дел:";
    gitHubSource.innerHTML = "ГитХаб";
    unsplashSource.innerHTML = "Ансплеш";
    flickrSource.innerHTML = "Фликр";
    en.innerHTML = "анг";
    ru.innerHTML = "рус";

    yes.forEach((a) => {
      a.innerHTML = "да";
    });
    no.forEach((a) => {
      a.innerHTML = "нет";
    });
  }
}

buttonLanguageEn.addEventListener("click", changeLangEn);
buttonLanguageRu.addEventListener("click", changeLangRu);

//переключення джерела для бекграунду
let buttonBackgraundGitHub = document.querySelector("#button__gitHub");
let buttonBackgraundUnsplash = document.querySelector("#button__unsplash");
let buttonBackgraundFlickr = document.querySelector("#button__flickr");

let settingsApiTeg = document.querySelector("#settings__api-teg");
function changebackgroundSourseGitHub() {
  backgroundSourse = "gitHub";
  setBgGitHub();
  settingsApiTeg.classList.remove("settings__api-teg");
}
function changebackgroundSourseUnsplash() {
  backgroundSourse = "unsplash";
  setBgUnsplash();
  settingsApiTeg.classList.add("settings__api-teg");
}
function changebackgroundSourseFlickr() {
  backgroundSourse = "flickr";
  setBgFlickr();
  settingsApiTeg.classList.add("settings__api-teg");
}

buttonBackgraundGitHub.addEventListener("click", changebackgroundSourseGitHub);
buttonBackgraundUnsplash.addEventListener(
  "click",
  changebackgroundSourseUnsplash
);
buttonBackgraundFlickr.addEventListener("click", changebackgroundSourseFlickr);
//вибір тега

let searchTeg = document.querySelector("#search-teg");
let searchingTegForm = document.querySelector("#searching-teg-form");

function changeSearchTeg(event) {
  event.preventDefault();
  tags = searchTeg.value;
  if ((backgroundSourse = "unsplash")) {
    setBgUnsplash();
  } else if ((backgroundSourse = "flickr")) {
    setBgFlickr();
  }
}

searchingTegForm.addEventListener("submit", changeSearchTeg);
// переключення часу
let buttonTimeYes = document.querySelector("#button__time__yes");
let buttonTimeNo = document.querySelector("#button__time__no");
function openTimeBlock() {
  time.classList.remove("hide-block");
}
function hideTimeBlock() {
  time.classList.add("hide-block");
}
buttonTimeYes.addEventListener("click", openTimeBlock);
buttonTimeNo.addEventListener("click", hideTimeBlock);

// переключення дати
let buttonDateYes = document.querySelector("#button__date__yes");
let buttonDateNo = document.querySelector("#button__date__no");

function openDateBlock() {
  dateSelector.classList.remove("hide-block");
}
function hideDateBlock() {
  dateSelector.classList.add("hide-block");
}
buttonDateYes.addEventListener("click", openDateBlock);
buttonDateNo.addEventListener("click", hideDateBlock);

// переключення привітання
let buttonGreetingYes = document.querySelector("#button__greeting__yes");
let buttonGreetingeNo = document.querySelector("#button__greeting__no");
let greetingContainer = document.querySelector(".greeting-container");
function openGreetingBlock() {
  greetingContainer.classList.remove("hide-block");
}
function hideGreetingBlock() {
  greetingContainer.classList.add("hide-block");
}
buttonGreetingYes.addEventListener("click", openGreetingBlock);
buttonGreetingeNo.addEventListener("click", hideGreetingBlock);

// переключення цитати
let buttonQuoteYes = document.querySelector("#button__quote__yes");
let buttonQuoteNo = document.querySelector("#button__quote__no");
let quoteBlock = document.querySelector("#quote-block");
function openQuoteBlock() {
  quoteBlock.classList.remove("hide-block");
}
function hideQuoteBlock() {
  quoteBlock.classList.add("hide-block");
}
buttonQuoteYes.addEventListener("click", openQuoteBlock);
buttonQuoteNo.addEventListener("click", hideQuoteBlock);

// переключення погоди
let buttonWeatherYes = document.querySelector("#button__weather__yes");
let buttonWeatherNo = document.querySelector("#button__weather__no");
let weather = document.querySelector(".weather");

function openWeatherBlock() {
  weather.classList.remove("hide-block");
}
function hideWeatherBlock() {
  weather.classList.add("hide-block");
}

buttonWeatherYes.addEventListener("click", openWeatherBlock);
buttonWeatherNo.addEventListener("click", hideWeatherBlock);

// переключення аудіо
let buttonAudioYes = document.querySelector("#button__audio__yes");
let buttonAudioNo = document.querySelector("#button__audio__no");
let playerBlock = document.querySelector("#player");
function openPlayerBlock() {
  playerBlock.classList.remove("hide-block");
}
function hidePlayerBlock() {
  playerBlock.classList.add("hide-block");
}
buttonAudioYes.addEventListener("click", openPlayerBlock);
buttonAudioNo.addEventListener("click", hidePlayerBlock);

// переключення TODO
let buttonTodolistYes = document.querySelector("#button__todolist__yes");
let buttonTodolistNo = document.querySelector("#button__todolist__no");
let toDoBlockText = document.querySelector("#todo-block__text");

function closeToDoBlock() {
  toDoBlockText.classList.add("hide-block");
  toDoBlockTextContainer.classList.add("todo-block__container-none");
}
function openToDoBlock() {
  toDoBlockText.classList.remove("hide-block");
}

buttonTodolistYes.addEventListener("click", openToDoBlock);
buttonTodolistNo.addEventListener("click", closeToDoBlock);

// відкриття TODO
let toDoBlockTextContainer = document.querySelector("#todo-block__container");
function openCloseToDoBlockWithIcon() {
  toDoBlockTextContainer.classList.toggle("todo-block__container-none");
}
toDoBlockText.addEventListener("click", openCloseToDoBlockWithIcon);

// відкриття налаштувань
let settingsBlock = document.querySelector(".settings__block");
let settingsIcon = document.querySelector(".settings-icon");
function openSettingsBlock() {
  settingsBlock.classList.toggle("settings__block-open");
}
settingsIcon.addEventListener("click", openSettingsBlock);

//заповнення ToDo
let toDoItem = document.querySelector("#todo-input");
let toDoConfirm = document.querySelector("#confirm-input");
let todoItemsList = document.querySelector("#todo-items-list");

function deleteToDoItem(event) {
  event.preventDefault();
  event.target.parentElement.outerHTML = "";
  setLocalStorage();
}

function addToDoItem(event) {
  event.preventDefault();

  todoItemsList.innerHTML =
    todoItemsList.innerHTML +
    `<p class="todo-text">${toDoItem.value} <i class="fa-solid fa-delete-left"></i></p>`;

  let deleteIcon = document.querySelectorAll(".fa-delete-left");

  deleteIcon.forEach((a) => a.addEventListener("click", deleteToDoItem));
  setLocalStorage();
}

toDoConfirm.addEventListener("click", addToDoItem);

getWeather();
showTime();
getRandomNum();
setBgGitHub();
getQuotes();
