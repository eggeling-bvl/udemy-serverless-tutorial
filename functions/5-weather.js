require('dotenv').config()
const axios = require('axios');

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial&q=`
exports.handler = async (event,context,cb) =>{

    const method = event.httpMethod;

    if(method !== 'POST'){
        return {
            statusCode:400,
            body:'Es ist not POST',
        }
    }



    const {city} = JSON.parse(event.body);
    try {
        const resp = await axios.get(`${url}${city}`)
        return {
            statusCode:200,
            body: JSON.stringify(resp.data),
        }
    } catch (error) {
        
    }

   
}