let sendData = []; 
async function findCityData(sendData) {
    let url = `https://api.openweathermap.org/data/2.5/weather?`;
    if (sendData[2] == -1) {
        let latitude = sendData[0]
        let longitude = sendData[1]
        url = url + `lat=${latitude}&lon=${longitude}&`
    }
    else {
        let city = sendData[2]
        url = url + `q=${city}&`
    }
    url = url + 'appid=79fc8ee1eb248f9160c76cd542c63ce2'
    // now just call the api 
    axios.get(url)
        .then(res => {

            const cityName = res.data.name
            const weather = (res.data.weather[0].main.toLowerCase())
            const temp = res.data.main.temp - 273.15
            const tempFeelsLike = res.data.main.feels_like - 273.15
            const humidity = res.data.main.humidity
            const pressure = res.data.main.pressure
            const windSpeed = res.data.wind.speed

            let imgSrc = document.getElementById('weatherImg')
            imgSrc.src = `./images/${weather}.png`



            let cityy = document.getElementById("city")
            cityy.innerHTML = "place : " + cityName
            cityy.style.color = 'white'





            let tempId = document.getElementById("temp")
            tempId.innerHTML = "temp : " + temp
            tempId.style.color = 'white'


            let feels_likeTemp = document.getElementById("fellTemp")
            feels_likeTemp.innerText = "fells like temp : " + tempFeelsLike
            feels_likeTemp.style.color = 'white'




            let windId = document.getElementById('wind')
            windId.innerHTML = "windspeed : " + windSpeed
            windId.style.color = 'white'




            let presserid = document.getElementById('presserID')
            presserid.innerHTML = "presser : " + pressure
            presserid.style.color = 'white'



            let humidityid = document.getElementById('humidity')
            humidityid.innerHTML = "humidity : " + humidity
            humidityid.style.color = 'white'






        })
        .catch(error => {

            alert("Something went wrong :< maybe entered city is not present in our databasee")

        })

}
// weather data for city search
document.getElementById('search').addEventListener('click', async function () {
    const city = document.getElementById('inputBox').value
    sendData = [];
    sendData.push(-1)
    sendData.push(-1)
    sendData.push(city)
    findCityData(sendData);
})
// weather data from current location
const btn = document.getElementById('btn')
function locationFind(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    sendData = [];
    sendData.push(latitude)
    sendData.push(longitude)
    sendData.push(-1);
    findCityData(sendData)
}
function locationNotFind(e) {
    alert("Some errror in finding your current location but no problem you can enter your location manually :)")
}
btn.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(locationFind, locationNotFind);
}) 