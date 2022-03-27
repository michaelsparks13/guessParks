// get DOM objects
const playAgainBtn = document.querySelector(".play-again");
const guess = document.querySelector("#guess");
const outcome = document.querySelector(".outcome");
const hintBtn = document.querySelector(".hintBtn");
const hint = document.querySelector(".hint");
const answer = document.querySelector(".answer");
const hardBtn = document.querySelector(".hardBtn");
const easyBtn = document.querySelector(".easyBtn");

// initalize variables needed later on
let allParks = [];
let parksWithImages = [];
let nationalParks = [];
let currentPark = {
  name: "",
  state: "",
  fullName: "",
};

stateList = {
  AZ: "Arizona",
  AL: "Alabama",
  AK: "Alaska",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  AS: "American Samoa",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  PR: "Puerto Rico",
  VI: "U.S. Virgin Islands",
  UM: "U.S. Minor Outlying Islands",
};

//helper functions

const getParksData = async (limit) => {
  const config = {
    headers: { "X-Api-Key": "EM1l8Rs2qxwc1QLCzWFgkOdXJUk6O9dmhSdf8YFQ" },
  };

  try {
    const { data } = await axios.get(
      `https://developer.nps.gov/api/v1/places?limit=${limit}`,
      config
    );
    allParks = data.data;
  } catch (e) {
    document.querySelector(".title").classList.add("incorrect")
    document.querySelector(".title").innerText = e 
  }
};

const filterParkImages = (allParks) => {
  for (let park of allParks) {
    if (park.images[0].url) {
      parksWithImages.push(park);
    }
  }
};

const filterNationalParks = (parksWithImages) => {
  for (let park of parksWithImages) {
    if (park.relatedParks.length !== 0) {
      if (
        typeof park.relatedParks[0].designation !== "undefined" &&
        typeof park.relatedParks[0].name !== "undefined"
      ) {
        if (park.relatedParks[0].designation.includes("National Park")) {
          nationalParks.push(park);
        }
      }
    }
  }
};

const setRandomPark = (arr) => {
  let randomPark = arr[Math.floor(Math.random() * arr.length)];
  let url = randomPark.images[0].url;
  document.querySelector(".park-image").setAttribute("src", url);

  currentPark.name = randomPark.relatedParks[0].name;
  currentPark.state = randomPark.relatedParks[0].states;
  currentPark.fullName = randomPark.relatedParks[0].fullName;
};

const resetText = () => {
  answer.innerText = "";
  hint.innerText = "";
  outcome.innerText = "";
  guess.value = "";
};

const resetButtons = () => {
  outcome.classList.add("hidden");
  answer.classList.add("hidden");
  hint.classList.add("hidden");
};

const getStateName = (stateCode) => {
  return this.stateList[stateCode];
};

async function startGame() {
    await getParksData(500);
    filterParkImages(allParks);
    startEasyMode();
  }
  
  function startHardMode() {
    setRandomPark(parksWithImages);
    hintBtn.classList.add("hidden");
    hint.innerText = "";
  }
  
  function startEasyMode() {
    filterNationalParks(parksWithImages);
    setRandomPark(nationalParks);
    hintBtn.classList.remove("hidden");
  }
  

//event listeners

easyBtn.addEventListener("click", () => {
  startEasyMode();
  resetText();
  resetButtons();
});

hardBtn.addEventListener("click", () => {
  startHardMode();
  resetText();
  resetButtons();
});

document.querySelector(".answerBtn").addEventListener("click", () => {
  if (answer.classList.contains("hidden")) {
    answer.classList.remove("hidden");
  }
  answer.innerText = currentPark.fullName;
});

playAgainBtn.addEventListener("click", () => {
  setRandomPark(parksWithImages);
  resetText();
  resetButtons();
});

guess.addEventListener("change", () => {
  let attempt = "";

  if (outcome.classList.contains("hidden")) {
    outcome.classList.remove("hidden");
  }

  attempt = guess.value;

  if (attempt.toUpperCase() === currentPark.name.toUpperCase()) {
    outcome.classList.add("correct");
    outcome.innerText = "Correct!";
  } else {
    outcome.classList.remove("correct");
    outcome.classList.add("incorrect");
    outcome.innerText = "Wrong, guess again!";
  }
});

hintBtn.addEventListener("click", () => {
  if (hint.classList.contains("hidden")) {
    hint.classList.remove("hidden");
  }
  fullState = getStateName(currentPark.state.substring(0, 2));
  hint.innerText = `This park is in ${fullState}`;
});



// start game
startGame();

