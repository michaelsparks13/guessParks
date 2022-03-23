// get DOM objects
const parkImage = document.querySelector(".park-image")
const playAgainBtn = document.querySelector(".play-again")
const answer = document.querySelector("#guess")
const guess =  document.querySelector("#guessBtn")
const outcome = document.querySelector(".outcome")
const hintBtn = document.querySelector(".hintBtn")
const hint = document.querySelector(".hint")
const answerBtn = document.querySelector(".answerBtn")
const givenAnswer = document.querySelector(".answer")
const hardBtn = document.querySelector(".hardBtn")
const easyBtn = document.querySelector(".easyBtn")


// initalize variables needed later on
let allParks = []
let parksWithImages = []
let nationalParks = []
let attempt = ""
let correctAnswer = ""
let state = ""

let currentPark = {
    name: "",
    state: "",
    fullName: ""
}



const getParksData = async(limit) => {
    const config = { headers: {"X-Api-Key": "EM1l8Rs2qxwc1QLCzWFgkOdXJUk6O9dmhSdf8YFQ"}}

    try {
        const  { data }   = await axios.get(`https://developer.nps.gov/api/v1/places?limit=${limit}`, config);
        allParks = data.data   
    } catch (e) {
        console.log("Oops! Ran into an error:")
        console.log(e)
    }

}

const filterParkImages = (allParks) => {
    for (let park of allParks) {
        if (park.images[0].url) {
            parksWithImages.push(park)
        }
    }
}

const filterNationalParks = (parksWithImages) => {
    for (let park of parksWithImages) {
        if (park.relatedParks.length !== 0) {
            if (typeof park.relatedParks[0].designation !== 'undefined' && typeof park.relatedParks[0].name !== 'undefined') {
                if (park.relatedParks[0].designation.includes("National Park")) {
                    nationalParks.push(park)
                }    
        }
        
        
        }
    }
}


const setRandomPark = (arr) => {
    let randomPark = arr[Math.floor(Math.random() * arr.length)]
    let url = randomPark.images[0].url
    parkImage.setAttribute("src", url)

    console.log(randomPark)
    currentPark.name = randomPark.relatedParks[0].name
    currentPark.state = randomPark.relatedParks[0].states
    currentPark.fullName = randomPark.relatedParks[0].fullName
    console.log("state:");
    console.log(currentPark.state);
}

easyBtn.addEventListener("click", () => {
    startEasyMode();
})

hardBtn.addEventListener("click", () => {
    startHardMode();
})

answerBtn.addEventListener("click", () => {
    givenAnswer.innerText = currentPark.fullName;
})

playAgainBtn.addEventListener("click", () => {
    setRandomPark(parksWithImages)

    givenAnswer.innerText = "";
    hint.innerText = "";
    outcome.innerText = "";
    answer.value = "";

    console.log("new answer:")
    console.log(currentPark.name)
})

answer.addEventListener("change", () => {
    console.log(answer.value);
    attempt = answer.value;
    
    if (attempt.toUpperCase() === currentPark.name.toUpperCase()) {
        console.log("Correct!")
        outcome.classList.add("correct")
        outcome.innerText = "Correct!"
    } else {
        outcome.classList.add("incorrect")
        outcome.innerText = "Wrong, guess again!"
    }

})



hintBtn.addEventListener("click", () => {
    console.log(currentPark.state)
    fullState = getStateName(currentPark.state.substring(0,2))
    hint.innerText = `This park is in ${fullState}`
})

const getStateName = (stateCode) => {
    return this.stateList[stateCode];
    }
    
stateList = {
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    AS: "American Samoa",
    GU: "Guam",
    MP: "Northern Mariana Islands",
    PR: "Puerto Rico",
    VI: "U.S. Virgin Islands",
    UM: "U.S. Minor Outlying Islands",
    }


async function startGame() {
    await getParksData(50);
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



startGame();



/*
- get results (did above)
- get all parks (destructure as data)
- filter out ones that don't have images (data[i].images[0].url)
- get park name (data[i].relatedParks[0].name)
- make one list that is national parks only (data[i].relatedParks[0].designation.includes(National Park))
- other list includes all parks
- get hint (use state... find a library that translates two letter codes into names; there's this: https://gist.github.com/calebgrove/c285a9510948b633aa47)
- select random image to show
- make error state
- consider filtering for images that include "cropped_image" in the URL? 

how do i do all of this? how do i create these lists.... 

functions: 
start game
start easy
start hard
get hint
loading?

*/

/*

left to do:
1. handle errors on fetch (update UI)
2. hide API key with .env file
3. refactor with evan
*/