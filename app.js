//const url = require('url');

//axios.post('http://something.com/', params.toString());


const getParksData = async() => {

    const config = { headers: {"X-Api-Key": "EM1l8Rs2qxwc1QLCzWFgkOdXJUk6O9dmhSdf8YFQ"}}

    try {
        const res = await axios.get("https://developer.nps.gov/api/v1/places?limit=200", config);   
        console.log(res)
    } catch (e) {
        console.log('error')
        console.log('e')
    }
    
}


getParksData();